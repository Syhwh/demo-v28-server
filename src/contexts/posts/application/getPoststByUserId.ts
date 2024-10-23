import { PostRepository } from "../entity/posts.repository";


export const getPostsByUserId = async (userId: string, projectRepository:PostRepository) => {
    try {
        return projectRepository.getPostsByUserId(userId);
    } catch (error) {
        throw new Error(`Unable to fetch Posts: ${error}`);
    }
}