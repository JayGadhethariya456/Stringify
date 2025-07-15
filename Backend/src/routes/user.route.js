import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { acceptFriendRequest, getFriendRequest, getMyFriends, getOutgoingFriendReqs, getRecommendedUsers, sendFriendRequest } from '../controllers/user.controller.js';

const Router = express.Router();

//apply middleware to all routes
Router.use(protectRoute);

Router.get('/', getRecommendedUsers);
Router.get('/friends', getMyFriends);

Router.post('/friend-request/:id' , sendFriendRequest)
Router.put('/friend-request/:id/accept' , acceptFriendRequest)

Router.get('/friend-requests' , getFriendRequest)
Router.get('/outgoing-friend-requests' , getOutgoingFriendReqs)

export default Router;