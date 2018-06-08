import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiServices} from '../api-services.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Params, Router} from '@angular/router';

import * as S3 from 'aws-sdk/clients/s3';

const bucket = new S3(
  {
    accessKeyId: 'Your access ID',
    secretAccessKey: 'Secret Access Key',
    region: 'region'
  }
);

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  token: string;
  status: number;
  formInfo: FormGroup;
  flag: boolean[] = [true, true, true];
  selectedFile: File[] = [];
  mes: string[] = [];
  startLoading: boolean[] = [false, false, false];
  submitRequest: any = {};
  constructor(private service: ApiServices,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.
      subscribe((params: Params) => {
        this.token = params['token'];
    });
    this.formInfo = new FormGroup({
      'img1': new FormControl(null),
      'img2': new FormControl(null),
      'img3': new FormControl(null),
    });
  }

  onSelectFile(event, i: number) {
    this.startLoading[i] = true;
    this.selectedFile.push(<File>event.target.files[0]);
    const params = {
      Bucket: 'bucket-name',
      Key: 'test-files/' + this.selectedFile[i].name,
      Body: this.selectedFile[i]
    };
    var upload = bucket.upload(params);
    var that = this;
    bucket.upload(params).on('httpUploadProgress', function(evt) {
      that.status = parseInt((evt.loaded * 100) / evt.total + '%', 10);
      if (that.status === 100) {
        that.startLoading[i] = false;
      }
    }).send(function(err, data) {
      that.mes.push(data.Location);
    });
    this.flag[i] = false;
  }
  onSubmit() {
    this.service.submitRequest(this.token, this.submitRequest)
      .subscribe(
        (data) => {
          window.alert(data.msg);
        }
      );
    this.formInfo.reset();
    this.router.navigate(['thank-you']);
  }
}
