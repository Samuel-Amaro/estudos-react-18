export function getImageUrl(
  person: { name: string; imageId: string },
  size = "s",
) {
  return "https://i.imgur.com/" + person.imageId + size + ".jpg";
}
