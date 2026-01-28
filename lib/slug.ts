export function slugify(input: string) {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, "") // يسمح بالعربي كذلك
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 60)
  }
  