export function parseInsight(insightText: string) {
  if (!insightText) return { title: "", content: "" };

  const cleaned = insightText.trim();

  const match = cleaned.match(/\*\*(.*?)\*\*(.*)/s);

  if (!match) {
    return {
      title: "",
      content: cleaned,
    };
  }

  const [, title, content] = match;

  return {
    title: title.trim(),
    content: content.trim(),
  };
}
