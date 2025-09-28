import { ID } from 'appwrite';
const collectionId = ID.unique(); 
const envVariable = import.meta.env;
const conf = {
    appwriteUrl: String(envVariable.VITE_APPWRITE_URL),
    secondappwriteUrl: String(envVariable.VITE_SECOND_APPWRITE_URL),
    appwriteProjectId: String(envVariable.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(envVariable.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(envVariable.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(envVariable.VITE_APPWRITE_BUCKET_ID)
}

export default conf