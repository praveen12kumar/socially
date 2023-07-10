//import { v4 as uuid } from "uuid";
//import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

// export const posts = [
//   {
//     _id: uuid(),
//     content:
//       "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
//     likes: {
//       likeCount: 0,
//       likedBy: [],
//       dislikedBy: [],
//     },
//     username: "adarshbalika",
//     createdAt: formatDate(),
//     updatedAt: formatDate(),
//   },
//   {
//     _id: uuid(),
//     content:
//       "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
//     likes: {
//       likeCount: 0,
//       likedBy: [],
//       dislikedBy: [],
//     },
//     username: "shubhamsoni",
//     createdAt: formatDate(),
//     updatedAt: formatDate(),
//   },
// ];


import { formatRandomCommentDate, formatRandomPostDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: "1",
    content: "Socially is the best app 🎉",
    pic: "",
    username: "praveenkumar",
    postedBy: {
      _id: "1",
      firstName: "Praveen",
      lastName: "Kumar",
      username: "praveenkumar",
      profile_pic: "https://i.ibb.co/QcfKmc4/profile.jpg",
    },
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: "3",
          firstName: "Ayush",
          lastName: "Singh",
          username: "ayush",
          profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022196/one_piece_1_anib9s.jpg",
        },
        {
          _id: "2",
          firstName: "Rahul",
          lastName: "Mallick",
          username: "mallick",
          profile_pic: "https://staticg.sportskeeda.com/editor/2022/07/c2ed4-16587439752781.png",
        },
      ],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "1",
        content: "Yeah... I am using it",
        postId: "1",
        user: {
          _id: "3",
          firstName: "Ayush",
          lastName: "Singh",
          username: "ayush",
          profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022196/one_piece_1_anib9s.jpg",
        },
        replies: [
          {
            _id: "1",
            user: {
              _id: "1",
              firstName: "Praveen",
              lastName: "Kumar",
              username: "praveenkumar",
              profile_pic: "https://i.ibb.co/QcfKmc4/profile.jpg",
            },
            content: "Ping me @ayush if you find any bug",
          },
        ],
        createdAt: formatRandomCommentDate(),
        updatedAt: formatRandomCommentDate(),
      },
      {
        _id: "2",
        content: "I am also using it",
        postId: "1",
        user: {
          _id: "2",
          firstName: "Rahul",
          lastName: "Mallick",
          username: "mallick",
          profile_pic: "https://staticg.sportskeeda.com/editor/2022/07/c2ed4-16587439752781.png",
        },
        replies: [
          {
            _id: "1",
            user: {
              _id: "1",
              firstName: "Praveen",
              lastName: "Kumar",
              username: "praveenkumar",
              profile_pic: "https://i.ibb.co/QcfKmc4/profile.jpg",
            },
            content: "Ping me @mallick if you find any bug",
          },
        ],
        createdAt: formatRandomCommentDate(),
        updatedAt: formatRandomCommentDate(),
      },
    ],
    createdAt: formatRandomPostDate(),
    updatedAt: formatRandomPostDate(),
  },
  {
    _id: "2",
    content: "Must try these momos from Kalimpong Restaurant, Dharamshala",
    pic: "https://www.thespruceeats.com/thmb/T_R22QniykdQ9aPCLKIk-O22Gh4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/steamed-momos-wontons-1957616-hero-01-1c59e22bad0347daa8f0dfe12894bc3c.jpg",
    username: "mallick",
    postedBy: {
      _id: "2",
      firstName: "Rahul",
      lastName: "Mallick",
      username: "mallick",
      profile_pic: "https://staticg.sportskeeda.com/editor/2022/07/c2ed4-16587439752781.png",
    },
    likes: {
      likeCount: 3,
      likedBy: [
        {
          _id: "3",
          firstName: "Ayush",
          lastName: "Singh",
          username: "ayush",
          profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022196/one_piece_1_anib9s.jpg",
        },
        {
          _id: "1",
          firstName: "Praveen",
          lastName: "Kumar",
          username: "praveenkumar",
          profile_pic: "https://i.ibb.co/QcfKmc4/profile.jpg",
        },
        {
          _id: "4",
          firstName: "Saurabh",
          lastName: "Kumar",
          username: "",
          profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022195/saitama_isaxm6.jpg",
        },
      ],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "1",
        content: "Sure, I'll give it a try.",
        postId: "2",
        user: {
          _id: "1",
          firstName: "Praveen",
          lastName: "Kumar",
          username: "praveenkumar",
          profile_pic: "https://i.ibb.co/QcfKmc4/profile.jpg",
        },
        replies: [],
        createdAt: formatRandomCommentDate(),
        updatedAt: formatRandomCommentDate(),
      },
    ],
    createdAt: formatRandomPostDate(),
    updatedAt: formatRandomPostDate(),
  },
  {
    _id: "3",
    content: "Hadimba Temple covered with snow, a symbol of peace and tranquility",
    pic: "https://2.bp.blogspot.com/-lWmqyny4pOU/XB_S3p271kI/AAAAAAAAZcU/k-1aAHyk5yAkF--jnHXs90xDwQ7AL1cKACLcBGAs/s1600/hidimba%2Bmata%2B2.jpg",
    username: "ayush",
    postedBy: {
      _id: "3",
      firstName: "Ayush",
      lastName: "Singh",
      username: "ayush",
      profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022196/one_piece_1_anib9s.jpg",
    },
    likes: {
      likeCount: 4,
      likedBy: [
        {
          _id: "2",
          firstName: "Rahul",
          lastName: "Mallick",
          username: "mallick",
          profile_pic: "https://staticg.sportskeeda.com/editor/2022/07/c2ed4-16587439752781.png",
        },
        {
          _id: "1",
          firstName: "Praveen",
          lastName: "Kumar",
          username: "praveenkumar",
          profile_pic: "https://i.ibb.co/QcfKmc4/profile.jpg",
        },
      ],
      dislikedBy: [],
    },
    comments: [],
    createdAt: formatRandomPostDate(),
    updatedAt: formatRandomPostDate(),
  },
  
  {
    _id: "4",
    content: "एक ख़ूबसूरत शाम",
    pic: "https://images.pexels.com/photos/6335643/pexels-photo-6335643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    username: "praveenkumar",
    postedBy: {
      _id: "1",
      firstName: "Praveen",
      lastName: "Kumar",
      username: "praveenkumar",
      profile_pic: "https://i.ibb.co/QcfKmc4/profile.jpg",
    },
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: "3",
          firstName: "Ayush",
          lastName: "Singh",
          username: "ayush",
          profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022196/one_piece_1_anib9s.jpg",
        },
        {
          _id: "2",
          firstName: "Rahul",
          lastName: "Mallick",
          username: "mallick",
          profile_pic: "https://staticg.sportskeeda.com/editor/2022/07/c2ed4-16587439752781.png",
        },
      ],
      dislikedBy: [],
    },
    comments: [],
    createdAt: formatRandomPostDate(),
    updatedAt: formatRandomPostDate(),
  },
  {
    _id: "5",
    content: "A random click",
    pic: "https://images.pexels.com/photos/13650389/pexels-photo-13650389.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    username: "mallick",
    postedBy: {
      _id: "2",
      firstName: "Rahul",
      lastName: "Mallick",
      username: "mallick",
      profile_pic: "https://staticg.sportskeeda.com/editor/2022/07/c2ed4-16587439752781.png",
    },
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: "3",
          firstName: "Ayush",
          lastName: "Singh",
          username: "ayush",
          profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022196/one_piece_1_anib9s.jpg",
        },
        {
          _id: "1",
          firstName: "Praveen",
          lastName: "Kumar",
          username: "praveenkumar",
          profile_pic: "https://i.ibb.co/QcfKmc4/profile.jpg",
        },
      ],
      dislikedBy: [],
    },
    comments: [],
    createdAt: formatRandomPostDate(),
    updatedAt: formatRandomPostDate(),
  },
  {
    _id: "6",
    content: "love this season",
    pic: "https://images.pexels.com/photos/15780002/pexels-photo-15780002/free-photo-of-speed-limit-sign.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    username: "ayush",
    postedBy: {
      _id: "3",
      firstName: "Ayush",
      lastName: "Singh",
      username: "ayush",
      profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022196/one_piece_1_anib9s.jpg",
    },
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    createdAt: formatRandomPostDate(),
    updatedAt: formatRandomPostDate(),
  },
  {
    _id: "7",
    content: "enjoying the ocean's breeze",
    pic: "https://images.pexels.com/photos/16208497/pexels-photo-16208497/free-photo-of-hills-on-sea-shore.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    username: "praveenkumar",
    postedBy: {
      _id: "1",
      firstName: "Praveen",
      lastName: "Kumar",
      username: "praveenkumar",
      profile_pic: "https://i.ibb.co/QcfKmc4/profile.jpg",
    },
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    createdAt: formatRandomPostDate(),
    updatedAt: formatRandomPostDate(),
  },
  {
    _id: "8",
    content: "finally!",
    pic: "https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg?auto=compress&cs=tinysrgb&w=600",
    username: "mallick",
    postedBy: {
      _id: "2",
      firstName: "Rahul",
      lastName: "Mallick",
      username: "mallick",
      profile_pic: "https://staticg.sportskeeda.com/editor/2022/07/c2ed4-16587439752781.png",
    },
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    createdAt: formatRandomPostDate(),
    updatedAt: formatRandomPostDate(),
  },
  {
    _id: "9",
    content: "Let's celebrate! My first car is here!",
    pic: "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=600",
    username: "ayush",
    postedBy: {
      _id: "3",
      firstName: "Ayush",
      lastName: "Singh",
      username: "ayush",
      profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022196/one_piece_1_anib9s.jpg",
    },
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    createdAt: formatRandomPostDate(),
    updatedAt: formatRandomPostDate(),
  },
  {
    _id: "10",
    content: "गंगा आरती",
    pic: "https://images.pexels.com/photos/7919683/pexels-photo-7919683.jpeg?auto=compress&cs=tinysrgb&w=600",
    username: "praveenkumar",
    postedBy: {
      _id: "1",
      firstName: "Praveen",
      lastName: "Kumar",
      username: "praveenkumar",
      profile_pic: "https://i.ibb.co/QcfKmc4/profile.jpg",
    },
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    createdAt: formatRandomPostDate(),
    updatedAt: formatRandomPostDate(),
  },
  {
    _id: "11",
    content: "शाम-ए-बनारस",
    pic: "https://images.unsplash.com/photo-1665413791165-b25d42542b80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGJhbmFyYXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    username: "mallick",
    postedBy: {
      _id: "2",
      firstName: "Rahul",
      lastName: "Mallick",
      username: "mallick",
      profile_pic: "https://staticg.sportskeeda.com/editor/2022/07/c2ed4-16587439752781.png",
    },
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    createdAt: formatRandomPostDate(),
    updatedAt: formatRandomPostDate(),
  },
  {
    _id: "12",
    content: "अंतः अस्ति प्रारंभः \n📍Manikarnika Ghat",
    pic: "https://images.unsplash.com/photo-1682827818567-51c02517aa49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    username: "ayush",
    postedBy: {
      _id: "3",
      firstName: "Ayush",
      lastName: "Singh",
      username: "ayush",
      profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022196/one_piece_1_anib9s.jpg",
    },
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    createdAt: formatRandomPostDate(),
    updatedAt: formatRandomPostDate(),
  },
];

