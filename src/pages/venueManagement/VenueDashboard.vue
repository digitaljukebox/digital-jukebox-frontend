<template>
  <div>
    <div class="row justify-evenly">
      <q-card class="data-card">
        <q-card-section>
          <div class="text-h6">Venue Profile Views</div>
        </q-card-section>

        <q-card-section>
          <div>
            <canvas
              id="profile-views-chart"
              width="100%"
              height="100%"
              style="padding-bottom: 50px;"
            ></canvas>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="data-card">
        <q-card-section>
          <div class="text-h6">Daily User Check-Ins</div>
        </q-card-section>

        <q-card-section> </q-card-section>
      </q-card>
      <q-card class="data-card">
        <q-card-section>
          <div class="text-h6">Daily User Engagment</div>
          <div class="text-subtitle1 text-grey-6">
            Number of requests per user
          </div>
        </q-card-section>

        <q-card-section> </q-card-section>
      </q-card>
      <q-card class="data-card">
        <q-card-section>
          <div class="text-h6">Daily Conversion Rate</div>
          <div class="text-subtitle1 text-grey-6">
            Check-ins relative to views
          </div>
        </q-card-section>

        <q-card-section> </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
.data-card {
  margin: 25px;
  height: 20em;
  width: 20em;
}
</style>

<script lang="ts">
import firebase from 'firebase';
import 'firebase/firestore';
import Chart from 'chart.js';
import { VenueProfileView } from 'src/types';

const db = firebase.firestore();

export default {
  name: 'VenueDashboard',
  data() {
    return {
      venueId: ''
    };
  },
  mounted() {
    this.venueId = this.$route.params.id;

    this.initProfileViewsChart();
  },
  methods: {
    initProfileViewsChart() {
      let _this = this;
      db.collection('venueprofileviews').onSnapshot(querySnapshot => {
        const venueProfileViews: VenueProfileView[] = [];

        querySnapshot.forEach(doc => {
          let data = doc.data();
          if (data.venueId == _this.venueId) {
            let profileView: VenueProfileView = {
              venueId: data.venueId,
              userId: data.userId,
              timestamp: data.timestamp.toDate()
            };
            venueProfileViews.push(profileView);
          }
        });

        type viewsBucket = {
          [key: string]: number;
        };

        let viewsPerDay: viewsBucket = {};
        for (let i = 0; i < venueProfileViews.length; i++) {
          let view = venueProfileViews[i];
          let dateString = view.timestamp.toDateString();
          if (dateString in viewsPerDay) {
            viewsPerDay[dateString] += 1;
          } else {
            viewsPerDay[dateString] = 1;
          }
        }

        // get minimum date
        let minDate = new Date();
        let days = Object.keys(viewsPerDay);
        for (let i = 0; i < days.length; i++) {
          let parsed = new Date(days[i]);
          if (parsed < minDate) {
            minDate = parsed;
          }
        }

        const chartData = [];
        let now = new Date();
        for (let d = minDate; d <= now; d.setDate(d.getDate() + 1)) {
          chartData.push({
            x: new Date(d),
            y: viewsPerDay[d.toDateString()]
          });
        }

        console.log(chartData);
        const ctx = document.getElementById('profile-views-chart');
        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            datasets: [
              {
                label: 'Daily Venue Views',
                data: chartData
              }
            ]
          },
          options: {
            scales: {
              xAxes: [
                {
                  type: 'time',
                  time: {
                    unit: 'day'
                  }
                }
              ],
              yAxes: [
                {
                  display: false,
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            },
            legend: {
              display: false
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem) {
                  return tooltipItem.yLabel;
                }
              }
            }
          }
        });
      });
    }
  }
};
</script>
