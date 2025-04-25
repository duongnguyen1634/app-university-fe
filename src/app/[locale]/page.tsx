import { getServerSession } from "next-auth";
import type { Metadata } from "next";

import CmpHome from "@/app/[locale]/(User)/home/page";
import { authOptions } from "../utils/authOptions";

export const metadata: Metadata = {
  title: "Home page",
  description: "home page description",
};
export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return <CmpHome />;
}
