import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-feed', imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  newPostContent: string = '';

  posts = [
    {
      id: 1,
      username: 'john_doe',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      image: 'https://picsum.photos/seed/pic1/600/400',
      caption: 'Exploring the mountains today! #adventure #travel',
      comments: 8,
      likes: 124,
      liked: false,
      time: '2 hours ago'
    },
    {
      id: 2,
      username: 'sarah_lee',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      image: 'https://picsum.photos/seed/pic2/600/400',
      caption: 'Morning coffee hits different ☕',
      comments: 4,
      likes: 89,
      liked: true,
      time: '4 hours ago'
    },
    {
      id: 3,
      username: 'mike_travels',
      avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
      image: 'https://picsum.photos/seed/pic3/600/400',
      caption: 'Sunset at the beach 🌅 #relax #life',
      comments: 15,
      likes: 256,
      liked: false,
      time: '6 hours ago'
    }
  ];

  createPost() {
    if (!this.newPostContent.trim()) return;

    const newPost = {
      id: Date.now(),
      username: 'current_user',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg', // Placeholder for current user
      image: `https://picsum.photos/seed/${Date.now()}/600/400`, // Random image for demo
      caption: this.newPostContent,
      comments: 0,
      likes: 0,
      liked: false,
      time: 'Just now'
    };

    this.posts.unshift(newPost);
    this.newPostContent = '';
  }

  toggleLike(post: any) {
    post.liked = !post.liked;
    if (post.liked) {
      post.likes++;
    } else {
      post.likes--;
    }
  }
}
