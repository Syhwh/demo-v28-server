

export const getPostsById = (
  id: string,
  postsRepository: postsRepository,
) => {
  try {
    return postsRepository.getPostsById(id);
  } catch (error) {
    throw new Error(`Unable to fetch posts: ${error}`);
  }
};
