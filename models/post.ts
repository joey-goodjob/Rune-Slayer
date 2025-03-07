import { Post } from "@/types/post";
import { getSupabaseClient } from "./db";

export enum PostStatus {
  Created = "created",
  Deleted = "deleted",
  Online = "online",
  Offline = "offline",
}

export async function insertPost(post: Post) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("posts").insert(post);

  if (error) {
    throw error;
  }

  return data;
}

export async function updatePost(uuid: string, post: Partial<Post>) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("posts")
    .update(post)
    .eq("uuid", uuid);

  if (error) {
    throw error;
  }

  return data;
}

export async function findPostByUuid(uuid: string): Promise<Post | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("uuid", uuid)
    .limit(1)
    .single();

  if (error) {
    return undefined;
  }

  return data;
}

export async function findPostBySlug(
  slug: string,
  locale: string
): Promise<Post | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("locale", locale)
    .limit(1)
    .single();

  if (error) {
    return undefined;
  }

  return data;
}

export async function getAllPosts(
  page: number = 1,
  limit: number = 50
): Promise<Post[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) {
    return [];
  }

  return data;
}

export async function getPostsByLocale(
  locale: string, // 接受一个字符串类型的参数 locale，代表语言或地区信息
  page: number = 1, // 接受一个数字类型的参数 page, 默认为 1，用于分页控制
  limit: number = 50 // 接受一个数字类型的参数 limit，默认为 50，用于限制每页返回的记录数
): Promise<Post[]> {
  // 返回一个 Promise 对象，该 Promise 解析为一个 Post 类型的数组
  const supabase = getSupabaseClient(); // 调用 getSupabaseClient 函数获取 Supabase 客户端实例
  const { data, error } = await supabase // 使用 Supabase 客户端查询数据库
    .from("posts") // 指定查询的表名为 "posts"
    .select("*") // 选择所有列
    .eq("locale", locale) // 添加一个条件，过滤掉 locale 不等于传入参数的记录
    .eq("status", PostStatus.Online) // 添加一个条件，过滤掉 status 不等于 Online 的记录
    .order("created_at", { ascending: false }) // 按照 created_at 列进行降序排序
    .range((page - 1) * limit, page * limit - 1); // 计算分页范围，从 (page - 1) * limit 到 page * limit - 1

  if (error) {
    // 如果查询过程中出现错误
    return []; // 返回一个空数组
  }

  return data; // 否则返回查询到的数据
}
