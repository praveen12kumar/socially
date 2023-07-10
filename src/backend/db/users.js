import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

//export const users = [
  // {
  //   _id: uuid(),
  //   firstName: "Adarsh",
  //   lastName: "Balika",
  //   username: "adarshbalika",
  //   password: "adarshBalika123",
  //   createdAt: formatDate(),
  //   updatedAt: formatDate(),
  //   profile_pic: "https://pbs.twimg.com/profile_images/1266934374060052480/O3nYz9s-_400x400.jpg",
  //   cover_pic: "https://pbs.twimg.com/profile_banners/822058153051295745/1678301248/1500x500",
  //   link: "https://github.com/shobhit-28/",
  //   bio: "Software Developer",
  // },
  // {
  //   _id: uuid(),
  //   firstName: "Praveen",
  //   lastName: "Kumar",
  //   username: "praveenkumar",
  //   password: "!@12QWqw",
  //   createdAt: formatDate(),
  //   updatedAt: formatDate(),
  //   profile_pic: "https://i.ibb.co/QcfKmc4/profile.jpg",
  //   cover_pic: "https://pbs.twimg.com/profile_banners/822058153051295745/1678301248/1500x500",
  //   link: "https://github.com/praveen12kumar",
  //   bio: "Software Developer",
  // },


   export const users = [
    {
      _id: "1",
      firstName: "Praveen",
      lastName: "Kumar",
      user_email: "praveenshakya1@gmail.com",
      username: "praveenkumar",
      password: "!@12QWqw",
      createdAt: formatDate(),
      updatedAt: formatDate(),
      profile_pic: "https://i.ibb.co/QcfKmc4/profile.jpg",
      cover_pic: "https://i.ibb.co/vmWKyhG/pachmadi.jpg",
      link: "https://github.com/praveen12kumar/",
      bio: "Software Developer",
      followers: [
        {
          _id: "3",
          firstName: "Ayush",
          lastName: "Singh",
          username: "ayush",
          profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022196/one_piece_1_anib9s.jpg",
        }
      ],
      following: [
       

      ],
      bookmarks: [],
      id: "1"
    },
    {
      _id: "2",
      firstName: "Rahul",
      lastName: "Mallick",
      user_email: "mallickrahul@gmail.com",
      username: "mallick",
      password: "1234abcd",
      createdAt: formatDate(),
      updatedAt: formatDate(),
      profile_pic: "https://staticg.sportskeeda.com/editor/2022/07/c2ed4-16587439752781.png",
      cover_pic: "",
      link: "https://mallickrahul.netlify.app",
      bio: "Singer",
      followers: [],
      following: [],
      bookmarks: [],
    },
    {
      _id: "3",
      firstName: "Ayush",
      lastName: "Singh",
      user_email: "singhayush@gmail.com",
      username: "ayush",
      password: "1234abcd",
      createdAt: formatDate(),
      updatedAt: formatDate(),
      profile_pic: "https://res.cloudinary.com/randomwave45/image/upload/v1650022196/one_piece_1_anib9s.jpg",
      cover_pic: "",
      link: "https://singhayush.netlify.app",
      bio: "Automotive Designer",
      followers: [],
      following: [],
      bookmarks: [],
    },
  
];
