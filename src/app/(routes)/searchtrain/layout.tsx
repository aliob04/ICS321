import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Trains - trainstation",
  description: "Search for available trains",
};

export default function SearchTrainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
} 