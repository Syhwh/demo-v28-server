export interface Like {
  id: number;
  userId: number;
  postId: number;
  isLike: boolean;
}

export interface LikeInput {
  userId: number;
  postId: number;
  isLike: boolean;
}
