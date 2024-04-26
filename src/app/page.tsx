"use client";
import React, { useState } from "react";
import { baseUrl, getPhotos, sleep } from "@/util";

import Image from "next/image";

const urlsStat = [
  "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDI0NzR8MHwxfHNlYXJjaHw",
  "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDI0NzR8MHwxfHNlYXJjaHw",
  "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDI0NzR8MHwxfHNlYXJjaHw",
  "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDI0NzR8MHwxfHNlYXJjaHw",
  "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDI0NzR8MHwxfHNlYXJjaHw",
  "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDI0NzR8MHwxfHNlYXJjaHw",
];

export default function page() {
  const [story, setStory] = useState<string>("");
  const [urls, setUrls] = useState<string[]>([]);
  const [alts, setAlts] = useState<string[]>([]);
  // const createImage = async () => {
  //   console.log("start " + baseUrl + "/generateImage");
  //   const res = await axios.post(baseUrl + "/generateImage");
  //   console.log(res.data);
  // };

  //  not wait
  // const createImages = async () => {
  //   try {
  //     if (story === "") return;
  //     const storyArr = story.split(".");
  //     setAlts(storyArr);
  //     const promiseArrFuncs = storyArr.map((storyLine) => getPhotos(storyLine));
  //     const res = await Promise.all(promiseArrFuncs);
  //     console.log(res);
  //     setUrls(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //  with wait
  const createImages = async () => {
    try {
      if (story === "") return;
      const storyArr = story.split(".");
      setAlts(storyArr);
      let resUrls = [];
      for (const storyLine of storyArr) {
        const resUrl = await getPhotos(storyLine);
        resUrls.push(resUrl);
        console.log({ storyLine, resUrl });
        await sleep();
      }
      setUrls(resUrls);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-screen ">
      <div className="flex justify-center items-center mt-10 text-xl font-semibold">
        create vid ai
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col items-start">
          <textarea
            className="border-2 border-black rounded-md p-2"
            name="story"
            id=""
            cols="30"
            rows="10"
            value={story}
            onChange={(e) => setStory(e.target.value)}
          ></textarea>
          <button
            disabled={story === ""}
            className={`${
              story !== "" && "hover:bg-blue-200"
            } p-2 rounded-md border-2 border-black w-full`}
            onClick={createImages}
          >
            getPhotos
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <ul className="flex gap-2 flex-wrap ">
          {urls.map((url, key) => (
            <li className="rounded-md shadow-md" key={key}>
              <Image alt={alts[key]} src={url} width={200} height={200} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// text to voice
//  text to images
// connect images
// connect voice and images . ?
