import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { StarIcon } from "lucide-react";
import React from "react";

interface Props {
  snippetId: Id<"snippets">;
}

const StarButton: React.FC<Props> = ({ snippetId }) => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const isStarred = useQuery(api.snippets.isSnippetStarted, {
    snippetId,
    userId: user!.id,
  });
  const starCount = useQuery(api.snippets.getSnippetStarCount, {
    snippetId,
  });
  const star = useMutation(api.snippets.starSnippet);

  const handleStar = async () => {
    if (!isSignedIn) return;
    await star({ snippetId, userId: user!.id });
  };
  return (
    <button
      className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${isStarred ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20" : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"}`}
      onClick={() => handleStar()}
    >
      <StarIcon
        className={`size-4 ${isStarred ? "fill-yellow-500" : "fill-none group-hover:fill-gray-400"}`}
      />
      <span
        className={`text-xs font-medium ${isStarred ? "text-yellow-500" : "text-gray-400"}`}
      >
        {starCount}
      </span>
    </button>
  );
};

export default StarButton;
