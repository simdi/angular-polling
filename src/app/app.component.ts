import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from './services/post.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular Polling';
  posts: any = [];
  post: any = {};
  poll: any;
  searchControl = new FormControl();

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPost();
    setInterval(() => {
      this.getPost();
    }, 10000);

    this.searchControl.valueChanges.subscribe(value => {
      const oldData = this.posts;
      if (value.length > 0) {
        this.posts = oldData.filter(x => x.title.toLowerCase().includes(value));
      } else {
        this.posts = oldData;
      }
    });
  }

  getPost() {
    this.poll = this.postService.getPosts().subscribe(res => this.posts = res.hits);
  }

  onClickViewPost(item) {
    this.post = item;
  }

  ngOnDestroy() {
    this.poll.unsubscribe();
  }
}
