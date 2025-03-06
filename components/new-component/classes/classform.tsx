"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 内部职业详情组件
function ClassDetail({ classId }: { classId: string }) {
  const [loading, setLoading] = useState(true);

  // 模拟数据
  const classData = {
    name: classId.charAt(0).toUpperCase() + classId.slice(1),
    description: "职业描述信息",
    subClasses: ["子职业1", "子职业2"],
  };

  useEffect(() => {
    // 模拟加载
    setTimeout(() => setLoading(false), 300);
  }, [classId]);

  if (loading) return <p>加载中...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{classData.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{classData.description}</p>
        <div className="mt-4">
          <h3 className="font-medium">子职业:</h3>
          <ul className="list-disc pl-5 mt-2">
            {classData.subClasses.map((sub, index) => (
              <li key={index}>{sub}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

// 主页面组件
export default function ClassesPage() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  // 职业数据
  const tierData = [
    {
      tier: "S",
      color: "bg-red-500",
      classes: [
        { id: "archer", name: "Archer" },
        { id: "priest", name: "Priest" },
      ],
    },
    {
      tier: "A",
      color: "bg-orange-500",
      classes: [
        { id: "warrior", name: "Warrior" },
        { id: "magician", name: "Magician" },
        { id: "thief", name: "Thief" },
      ],
    },
    {
      tier: "B",
      color: "bg-yellow-500",
      classes: [{ id: "striker", name: "Striker" }],
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Rune Slayer Class Tier List
      </h1>
      <p className="text-center mb-6">
        There are 6 different main classes to choose from in Rune Slayer and
        each class with 2-3 evolvable sub classes. The best is Archer & Priest
      </p>

      <div className="max-w-3xl mx-auto bg-gray-800 p-4 rounded-lg">
        {tierData.map((tier) => (
          <div key={tier.tier} className="grid grid-cols-4 gap-2 mb-2">
            <div
              className={`${tier.color} flex items-center justify-center text-4xl font-bold`}
            >
              {tier.tier}
            </div>

            {tier.classes.map((cls) => (
              <Dialog key={cls.id}>
                <DialogTrigger asChild>
                  <button
                    onClick={() => setSelectedClass(cls.id)}
                    className="bg-black p-3 rounded text-white"
                  >
                    {cls.name}
                  </button>
                </DialogTrigger>
                <DialogContent>
                  {selectedClass && <ClassDetail classId={selectedClass} />}
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ))}
      </div>

      <p className="text-center mt-6">
        Don&apos;t forget to check out the unique sub-classes for each class
        <br />
        <span className="text-orange-500">
          (you can click on the icon to jump there quickly)
        </span>
      </p>
    </div>
  );
}
