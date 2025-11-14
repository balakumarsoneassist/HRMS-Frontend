import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-feed',imports: [FormsModule,CommonModule],
  standalone: true,
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  posts = [
    {
      username: 'john_doe',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      image: 'https://picsum.photos/seed/pic1/600/400',
      caption: 'Exploring the mountains today! #adventure #travel',
      comments: 8,
      time: '2 hours ago'
    },
    {
      username: 'sarah_lee',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      image: 'https://picsum.photos/seed/pic2/600/400',
      caption: 'Morning coffee hits different ☕',
      comments: 4,
      time: '4 hours ago'
    },
    {
      username: 'mike_travels',
      avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
      image: 'https://picsum.photos/seed/pic3/600/400',
      caption: 'Sunset at the beach 🌅 #relax #life',
      comments: 15,
      time: '6 hours ago'
    }
  ];}
