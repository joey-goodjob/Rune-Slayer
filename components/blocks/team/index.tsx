export default function Team() {
  return (
    <section>
      {/* 容器 */}
      <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10 md:py-16">
        {/* 标题 */}
        <h2 className="text-center text-3xl font-bold md:text-5xl">
          Character Classes
        </h2>
        <p className="mx-auto mb-6 mt-3 text-center text-sm text-gray-500 sm:text-base md:mb-8">
          Choose your character class wisely based on your playstyle
        </p>

        {/* 角色内容 */}
        <div className="grid grid-cols-2 justify-center justify-items-center gap-4 sm:justify-items-stretch md:gap-6 md:grid-cols-2">
          {/* Archer - S-Tier */}
          <div className="grid w-full grid-flow-row justify-center gap-3 rounded-md border border-solid border-gray-300 p-4 md:grid-cols-2">
            <img
              src="/imgs/5.png"
              alt="Archer class icon"
              className="inline-block h-48 w-48 object-cover"
            />
            <div>
              <p className="text-xl font-semibold">Archer</p>
              <p className="mb-1 font-semibold text-purple-800">S-Tier</p>
              <p className="mb-2 font-semibold text-gray-500">
                Ranged Damage Dealer
              </p>
              <p className="text-sm text-gray-500">
                The most broken class. Archers attack from range, cause arrow
                rain, and Beast Tamer specialization makes them overpowered.
              </p>
            </div>
          </div>

          {/* Priest - S-Tier */}
          <div className="grid w-full grid-flow-row justify-center gap-3 rounded-md border border-solid border-gray-300 p-4 md:grid-cols-2">
            <img
              src="/imgs/3.png"
              alt="Priest class icon"
              className="inline-block h-48 w-48 object-cover"
            />
            <div>
              <p className="text-xl font-semibold">Priest</p>
              <p className="mb-1 font-semibold text-purple-800">S-Tier</p>
              <p className="mb-2 font-semibold text-gray-500">
                Healer & Support
              </p>
              <p className="text-sm text-gray-500">
                Can do ranged/melee damage and heal. Healing others and their
                pet puts them in a league of their own. A Priest with a powerful
                pet is almost unkillable.
              </p>
            </div>
          </div>

          {/* Thief - A-Tier */}
          <div className="grid w-full grid-flow-row justify-center gap-3 rounded-md border border-solid border-gray-300 p-4 md:grid-cols-2">
            <img
              src="/imgs/2.png"
              alt="Thief class icon"
              className="inline-block h-48 w-48 object-cover"
            />
            <div>
              <p className="text-xl font-semibold">Thief</p>
              <p className="mb-1 font-semibold text-blue-700">A-Tier</p>
              <p className="mb-2 font-semibold text-gray-500">DPS & Stealth</p>
              <p className="text-sm text-gray-500">
                Quick, deadly, powerful but lacks defense. Great for players who
                can dodge and parry. Stick to shadows and strike at the right
                moment.
              </p>
            </div>
          </div>

          {/* Magician - A-Tier */}
          <div className="grid w-full grid-flow-row justify-center gap-3 rounded-md border border-solid border-gray-300 p-4 md:grid-cols-2">
            <img
              src="/imgs/6.png"
              alt="Magician class icon"
              className="inline-block h-48 w-48 object-cover"
            />
            <div>
              <p className="text-xl font-semibold">Magician</p>
              <p className="mb-1 font-semibold text-blue-700">A-Tier</p>
              <p className="mb-2 font-semibold text-gray-500">
                Ranged Spell-Caster
              </p>
              <p className="text-sm text-gray-500">
                Powerful ranged spell-slingers best in groups. Glass cannons on
                their own - pair with warriors or strikers for best results.
              </p>
            </div>
          </div>

          {/* Warrior - A-Tier */}
          <div className="grid w-full grid-flow-row justify-center gap-3 rounded-md border border-solid border-gray-300 p-4 md:grid-cols-2">
            <img
              src="/imgs/4.png"
              alt="Warrior class icon"
              className="inline-block h-48 w-48 object-cover"
            />
            <div>
              <p className="text-xl font-semibold">Warrior</p>
              <p className="mb-1 font-semibold text-blue-700">A-Tier</p>
              <p className="mb-2 font-semibold text-gray-500">
                Tank & Front-Line
              </p>
              <p className="text-sm text-gray-500">
                Hit hard and tank damage at the front line. Can wear powerful
                armor but must get close to action, which can be dangerous.
              </p>
            </div>
          </div>

          {/* Striker - B-Tier */}
          <div className="grid w-full grid-flow-row justify-center gap-3 rounded-md border border-solid border-gray-300 p-4 md:grid-cols-2">
            <img
              src="/imgs/1.png"
              alt="Striker class icon"
              className="inline-block h-48 w-48 object-cover"
            />
            <div>
              <p className="text-xl font-semibold">Striker</p>
              <p className="mb-1 font-semibold text-gray-700">B-Tier</p>
              <p className="mb-2 font-semibold text-gray-500">Melee Fighter</p>
              <p className="text-sm text-gray-500">
                Least desirable class. Relies on speed to deliver fist blows but
                lacks defense. Easily taken out by powerful attacks. Needs
                future buffs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
