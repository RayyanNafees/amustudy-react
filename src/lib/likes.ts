import { ClientResponseError } from "pocketbase";
import pb from "@/lib/pb";
import { Collections } from "../../pocketbase-types";

const userId = () => pb.authStore.model.id;

const likeCol = pb.collection(Collections.Likes);

export type LikeState = 1 | -1 | 0;
export type LikeAction = 1 | -1;

const getLike = (postId: string) =>
  likeCol.getFirstListItem(`postId = "${postId}"`);

const getUserReaction = async (
  postId: string
): Promise<[LikeState, string | null]> => {
  try {
    const like = await likeCol.getFirstListItem(
      `postId = "${postId}" && userId = "${userId()}"`
    );
    return [like.like, like.id];
  } catch (e) {
    if (e instanceof ClientResponseError) {
      if (e.status === 404) {
        return [0, null];
      }
    }
  }
};
const createLike = (postId: string, like: LikeAction) =>
  likeCol.create({ postId, like, userId: userId() });

const switchLike = (likeId: string, like: LikeAction) =>
  likeCol.update(likeId, { like });

const unlike = (likeId: string) => likeCol.delete(likeId);

const handleLike = async (
  state: LikeState,
  action: LikeAction,
  postId: string,
  like_id?: string
): Promise<LikeState> => {
  if (state === 0) {
    await createLike(postId, action);
    return action;
  }
  const likeId = like_id || (await getLike(postId)).id;
  if (state === action) {
    await unlike(likeId);
    return 0;
  }
  if (state === -action) {
    await switchLike(likeId, action);
    return action;
  }
};

const getNetLikes = (postId: string) =>
  pb.collection("like_count").getFirstListItem(`postId = "${postId}"`);

export { handleLike, getNetLikes, getLike, getUserReaction };
