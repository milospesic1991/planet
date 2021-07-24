import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Planet } from "./../shared/models";

const baseUrl = "http://localhost:3001/api/planets";

@Injectable({
  providedIn: 'root',
})
export class PlanetService {
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getPlanets = () => {
    return this.http.get<Array<Planet>>(baseUrl).pipe(
      map(data => {
        if (!!data) {
          let planets = new Array<Planet>();
          data.forEach(planet => planets.push(new Planet(planet)));
          return planets;
        } else {
          this.toastr.error('Something went wrong');
          return [];
        }
      })
    );
  }

  getPlanet = (id: string): Observable<Planet> => {
    return this.http.get<Planet>(baseUrl + '/' + id).pipe(map(planet => {
      if (!!planet) {
        let planetDetails = new Planet(planet);
        return planetDetails;
      } else {
        return null;
      }
    }))
  }

  createPlanet = (planet: Planet): Observable<Planet> => {
    return this.http.post<Planet>(baseUrl, planet).pipe(map(planet => {
      if (!!planet) {
        this.toastr.success('Planed created');
        return new Planet(planet);
      } else {
        this.toastr.error('Something went wrong');
        return null;
      }
    }))
  }

  updatePlanet = (planet: Planet): Observable<Planet> => {
    return this.http.put<Planet>(baseUrl + '/' + planet.id, planet).pipe(map(res => {
      if (!!res) {
        this.toastr.success('Planed edited');
        return new Planet(res);
      } else {
        this.toastr.error('Something went wrong');
        return null;
      }
    }))
  }

  deletePlanet = (id: number): Observable<Planet> => {
    return this.http.delete<Planet>(`${baseUrl}/${id}`).pipe(map(res => {
      // return new Planet(res);
      if (!!res) {
        this.toastr.success('Successfully deleted');
        return res;
      } else {
        this.toastr.error('Something went wrong');
        return null;
      }
    }))
  }

}
