import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  chapterForm: FormGroup;
  commentForm: FormGroup;
  currentChapter: Object;
  title = 'app';
  chapterList = [];
  constructor(
    private formBuilder: FormBuilder
  ) { }

  selectCurrentChapter(chapter): void {
    console.log(18, chapter);
    this.currentChapter = chapter;
  }
  deleteCurrentChapter(chapter): void {
    this.chapterList.splice(this.chapterList.indexOf(chapter), 1);
  }
  keyDownFunction(event): void {
    console.log(26, event);
    if ((event.keyCode === 13 && event.ctrlKey === true) || (event.keyCode === 13 && event.metaKey === true)) {
      console.log(27, this.commentForm.value.commentDescription);
      console.log(28, this.currentChapter);
    }
  }
  addChapter(): void {
    console.log(18, this.chapterForm.value.chapterInput);
    this.chapterList.push(
      {
        title: this.chapterForm.value.chapterInput,
        active: true,
        comments: []
      }
    );
    console.log(42, this.chapterList[this.chapterList.length - 1]);

    this.currentChapter = this.chapterList[this.chapterList.length - 1];
    console.log(34, this.currentChapter);

    console.log(35, this.chapterForm.controls);
    this.chapterForm.controls['chapterInput'].setValue('');
    console.log(19, this.chapterList);
  }

  ngOnInit(): void {
    this.chapterForm = this.formBuilder.group({
      chapterInput: ['', [Validators.required]]
    });
    this.commentForm = this.formBuilder.group({
      commentDescription: ['', [Validators.required]]
    });
  }
}
