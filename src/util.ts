import { createApi } from "unsplash-js";

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASIC_URL
    : process.env.NEXT_PUBLIC_BASIC_URL_PRODUCTION;

export async function getPhotos(info: string) {
  console.log(process.env);
  if (!process.env.NEXT_PUBLIC_UNSPLASH_KEY)
    throw new Error("unspalsh key not defiened");
  const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_KEY,
  });
  let result;
  try {
    result = await unsplash.search.getPhotos({
      query: info,
      page: 1,
      perPage: 1,
    });
    if (!result.response) throw new Error("no response");
    let urls = result.response.results.map((photo: any, index: number) => {
      return photo.urls.regular;
    });
    console.log(urls);
    return urls[0];
  } catch (e: any) {
    alert(e.message);
  }
}

export async function sleep() {
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve("done");
    }, 3000)
  );
}
