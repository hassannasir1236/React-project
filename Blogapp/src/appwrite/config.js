import conf from "../conf";
import {Client, ID, Databases, Storage, Query, Account} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
     
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases  = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    /* Create post */
    async createPost({ title, slug, content, featuredImage, status = 'draft', userId }) {
        try {
            return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug, // 🔥 using slug as document ID
            {
                title,
                slug, // also storing it as a field
                content,
                featuredImage,
                status,
                userId,
            }
            );
        } catch (error) {
            console.error("Failed to create post:", error);
            throw error;
        }
    }


    /* Update post */
    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {title, content, featuredImage, status},
            )
        }catch (error){
            console.error("Failed to update post:", error);
            throw error;
        }
    }

    /* Delete post */

    async deletepost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        }catch (error){
            console.error("Failed to delete post:", error);
            throw error;
            return false
        }
    }

    /* Get Document */
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        }catch(error){
            console.error("Failed to get post:", error);
            throw error;
        }
    }

    /* Get Document base on status */
    async getPosts(queries = [Query.equal("status", "active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        }catch(error){
            console.error("Failed to get posts lists:", error);
            throw error;
        }
    }
    // File Upload Service 
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique,
                filej
            );

        }catch(error){
            console.error("Failed to Upload Files:", error);
            throw error;
        }
    }

    /* Delete file Service  */

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        }catch(error){
            console.error("Failed to delete Files:", error);
            throw error;
        }
    }

    /* Get file preview */
    getfilePreview(fileId){
        this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();
export default service;