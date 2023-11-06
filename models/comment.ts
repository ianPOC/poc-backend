import { ObjectId } from "mongodb";
const getMongoDb = require('../db/mongoDB').getMongoDb;

class UserComment {

    title: string
    likes: number
    userId: number
    description: string

    constructor(title: string, description: string, likes: number, userId: number) {
        this.likes = likes
        this.title = title,
        this.userId = userId, 
        this.description = description
    }

    save() {
        const mongoDb = getMongoDb();
        return mongoDb.collection('comments')
        .insertOne(this)
        .then((result: any) => {
            console.log(result) 
        })
        .catch((err: any) => {
            console.log(`ERROR WHILE SAVING COMMENT: ${err}`)
        })
    }

    static async findCommentsById(userId: number) {
        try {
            const mongoDb = getMongoDb();
            const comments = await mongoDb.collection('comments').find({ userId: userId }).toArray();
            return comments;
        } catch (err) {
            console.error(`ERROR WHILE GETTING ${userId} COMMENTS: ${err}`);
            throw err;
        }
    }

    static async updateCommentById(commentId: any, updatedData: any) {
        const mongoDb = getMongoDb();

        try {
            const commentsCollection = mongoDb.collection('comments');
    
            const filter = { _id: new ObjectId(commentId) };
            const update = {
                $set: {
                    title: updatedData.title,
                    description: updatedData.description,
                    likes: updatedData.likes
                }
            };
    
            const result = await commentsCollection.updateOne(filter, update);
    
            if (result.modifiedCount === 0) {
                return null;
            }
    
            return updatedData;
        } catch (err) {
            console.log('ERRO EDITING MODEL', err)
        }
    }

    static async deleteComment(commentId: any) {
        const mongoDb = getMongoDb();

        try {
            const result = await mongoDb.collection('comments').deleteOne({ _id: new ObjectId(commentId)});

            return result.deletedCount === 1;
        } catch (err) {
            console.error(`ERROR WHILE DELETING ${commentId} COMMENTS: ${err}`);
            throw err;
        }
    }
    
}

module.exports = UserComment;
