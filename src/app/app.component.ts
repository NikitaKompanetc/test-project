import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface CurrentChapter {
  title?: string;
  active?: string;
  comments?: Array<String>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  chapterForm: FormGroup;
  commentForm: FormGroup;
  currentChapter: CurrentChapter;
  title = 'app';
  chapterList = [];
  constructor(
    private formBuilder: FormBuilder
  ) { }

  pushToLocalStorage(): void {
    localStorage.chapterList = JSON.stringify(this.chapterList);
  }

  selectCurrentChapter(chapter): void {
    this.currentChapter = chapter;
  }

  deleteCurrentChapter(chapter): void {
    this.chapterList.splice(this.chapterList.indexOf(chapter), 1);
    this.currentChapter = this.chapterList[0];
    this.pushToLocalStorage();
  }

  addComment(event): void {
    if ((event.keyCode === 13 && event.ctrlKey === true) || (event.keyCode === 13 && event.metaKey === true)) {
      this.currentChapter.comments.push(this.commentForm.value.commentDescription);
      this.commentForm.controls['commentDescription'].setValue('');
      this.pushToLocalStorage();
    }
  }

  addChapter(): void {
    this.chapterList.push(
      {
        title: this.chapterForm.value.chapterInput,
        active: true,
        comments: []
      }
    );
    this.currentChapter = this.chapterList[this.chapterList.length - 1];
    this.chapterForm.controls['chapterInput'].setValue('');
    this.pushToLocalStorage();
  }

  ngOnInit(): void {
    if (localStorage.chapterList) {
      this.chapterList = JSON.parse(localStorage.chapterList);
      this.currentChapter = this.chapterList[0];
    }
    this.chapterForm = this.formBuilder.group({
      chapterInput: ['', [Validators.required]]
    });
    this.commentForm = this.formBuilder.group({
      commentDescription: ['', [Validators.required]]
    });
  }
}
