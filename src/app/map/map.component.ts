import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { } from '@types/googlemaps';
import {Service} from '../service.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  userdata: any[];
  cords: string[][] = [];
  names: string[] = [];
  date: Date[] = [];
  constructor(private service: Service) { }
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;

  ngOnInit() {
    this.service.getLocations()
      .subscribe(data => {
        this.userdata = data.response.data;
        for (let i = 0; i < this.userdata.length; i++) {
          this.names.push(this.userdata[i].comment);
          var temp: string[] = [];
          temp.push(this.userdata[i].lat);
          temp.push(this.userdata[i].lng);
          this.cords.push(temp);
          this.date.push(this.userdata[i].recorded_at);
        }
        console.log(this.date);
        this.mapInit();
        for (let i = 0; i < this.names.length; i++) {
          var lati = parseFloat(this.cords[i][0]);
          var lang = parseFloat(this.cords[i][1]);
          this.addMarker(lati, lang, this.names[i]);
        }
      });
  }

  mapInit() {
    var lati = parseFloat(this.cords[0][0]);
    var lang = parseFloat(this.cords[0][1]);
    var mapProp = {
      center: { lat: lati, lng: lang },
      title: this.names[0],
      zoom: 9,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProp);
  }

  addMarker (lati: number, lang: number, content: string) {
    var marker = new google.maps.Marker(
      {position: { lat: lati, lng: lang },
        map: this.map,
      });
    this.addInfoWindow(marker, content);
  }
  ngAfterViewInit() {}

  addInfoWindow(marker, message) {
    var infoWindow = new google.maps.InfoWindow({
      content: message
    });
    infoWindow.open(this.map, marker);
  }
}
