<template>
  <div>
    <div class="row" style="margin: 30px; margin-top: 10px; ">
      <div
        class="q-gutter-sm"
        style="display: flex; align-items: baseline; margin-right: 15px"
      >
        <span class="text-subtitle1" style="margin-right: 10px"
          >Show data from the last:</span
        >
        <q-input
          v-model.number="number"
          type="number"
          label=""
          style="width: 3em;"
        />
      </div>

      <div class="q-gutter-sm" style="display: flex; align-items: end">
        <q-radio v-model="period" val="day" label="Days" />
        <q-radio v-model="period" val="week" label="Weeks" />
        <q-radio v-model="period" val="month" label="Months" />
        <q-radio v-model="period" val="Year" label="Years" />
      </div>
    </div>
    <div class="row justify-evenly" style="margin: 15px">
      <q-card class="data-card">
        <q-card-section>
          <div class="text-h6">Venue Profile Views</div>
        </q-card-section>
        <div class="graph-container">
          <canvas id="profile-views-chart" />
        </div>
      </q-card>
      <q-card class="data-card">
        <q-card-section>
          <div class="text-h6">User Check-Ins</div>
        </q-card-section>

        <div class="graph-container">
          <canvas id="check-ins-chart" />
        </div>
      </q-card>
      <q-card class="data-card">
        <q-card-section>
          <div class="text-h6">Conversion Rate</div>
          <div class="text-subtitle1 text-grey-6">
            Number of check-ins per view
          </div>
        </q-card-section>

        <div class="graph-container" style="height: 330px">
          <canvas id="conversions-chart" />
        </div>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
.data-card {
  margin: 10px;
  height: 400px;
  width: 400px;
}

.graph-container {
  height: 350px;
  padding: 10px;
  padding-bottom: 30px;
}
</style>

<script lang="ts">
import firebase from 'firebase';
import 'firebase/firestore';
import Chart from 'chart.js';
import { VenueProfileView, VenueCheckIn } from 'src/types';
import dayjs from 'dayjs';

const db = firebase.firestore();

type checkInBucket = {
  [key: string]: number;
};

type viewsBucket = {
  [key: string]: number;
};

const chartOptions: Chart.ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
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
        // display: false,
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }
    ]
  },
  legend: {
    display: false
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem: { yLabel: string }) {
        return tooltipItem.yLabel;
      }
    }
  }
};

export default {
  name: 'VenueDashboard',
  data() {
    return {
      venueId: '',
      venueProfileViews: [],
      venueCheckIns: [],
      number: 2,
      period: 'week'
    } as {
      venueId: string;
      venueProfileViews: viewsBucket[];
      venueCheckIns: checkInBucket[];
      number: number;
      period: 'day' | 'week' | 'month' | 'year';
    };
  },
  mounted() {
    (this as any).venueId = (this as any).$route.params.id;

    (this as any).initProfileViewsChart();
    (this as any).initCheckInsChart();
  },
  computed: {
    viewsChartData() {
      let viewsPerDay: viewsBucket = {};
      for (let i = 0; i < (this as any).venueProfileViews.length; i++) {
        let view = (this as any).venueProfileViews[i];
        let dateString = view.timestamp.toDateString();
        if (dateString in viewsPerDay) {
          viewsPerDay[dateString] += 1;
        } else {
          viewsPerDay[dateString] = 1;
        }
      }

      // get minimum date
      let minDate = dayjs()
        .subtract((this as any).number, (this as any).period)
        .toDate();

      const chartData = [];
      let now = new Date();

      for (let d = minDate; d <= now; d.setDate(d.getDate() + 1)) {
        chartData.push({
          x: new Date(d),
          y: viewsPerDay[d.toDateString()] || 0
        });
      }
      return chartData;
    },
    checkInsChartData() {
      let checkInsPerDay: checkInBucket = {};

      for (let i = 0; i < (this as any).venueCheckIns.length; i++) {
        let checkIn = (this as any).venueCheckIns[i];
        let dateString = checkIn.timeStamp.toDateString();
        if (dateString in checkInsPerDay) {
          checkInsPerDay[dateString] += 1;
        } else {
          checkInsPerDay[dateString] = 1;
        }
      }

      // get minimum date
      let minDate = dayjs()
        .subtract((this as any).number, (this as any).period)
        .toDate();

      const chartData = [];

      let now = new Date();
      for (let d = minDate; d <= now; d.setDate(d.getDate() + 1)) {
        chartData.push({
          x: new Date(d),
          y: checkInsPerDay[d.toDateString()] || 0
        });
      }

      return chartData;
    },
    conversionChartData() {
      let checkInsPerDay: checkInBucket = {};
      for (let i = 0; i < (this as any).venueCheckIns.length; i++) {
        let checkIn = (this as any).venueCheckIns[i];
        let dateString = checkIn.timeStamp.toDateString();
        if (dateString in checkInsPerDay) {
          checkInsPerDay[dateString] += 1;
        } else {
          checkInsPerDay[dateString] = 1;
        }
      }

      let viewsPerDay: viewsBucket = {};
      for (let i = 0; i < (this as any).venueProfileViews.length; i++) {
        let view = (this as any).venueProfileViews[i];
        let dateString = view.timestamp.toDateString();
        if (dateString in viewsPerDay) {
          viewsPerDay[dateString] += 1;
        } else {
          viewsPerDay[dateString] = 1;
        }
      }

      // get minimum date
      let minDate = dayjs()
        .subtract((this as any).number, (this as any).period)
        .toDate();

      const chartData = [];

      let now = new Date();

      for (let d = minDate; d <= now; d.setDate(d.getDate() + 1)) {
        chartData.push({
          x: new Date(d),
          y:
            viewsPerDay[d.toDateString()] !== 0
              ? checkInsPerDay[d.toDateString()] /
                  viewsPerDay[d.toDateString()] || 0
              : 0
        });
      }

      return chartData;
    }
  },
  watch: {
    viewsChartData(chartData: any) {
      new Chart('profile-views-chart', {
        type: 'line',
        data: {
          datasets: [
            {
              data: chartData,
              backgroundColor: '#26a69a'
            }
          ]
        },
        options: chartOptions
      });
    },
    checkInsChartData(chartData: any) {
      new Chart('check-ins-chart', {
        type: 'line',
        data: {
          datasets: [
            {
              data: chartData,
              backgroundColor: '#26a69a'
            }
          ]
        },
        options: chartOptions
      });
    },
    conversionChartData(chartData: any) {
      new Chart('conversions-chart', {
        type: 'line',
        data: {
          datasets: [
            {
              data: chartData,
              backgroundColor: '#26a69a'
            }
          ]
        },
        options: {
          ...chartOptions,
          scales: {
            ...chartOptions.scales,
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  stepSize: 0.25
                }
              }
            ]
          }
        }
      });
    }
  },
  methods: {
    initProfileViewsChart() {
      db.collection('venueprofileviews').onSnapshot(querySnapshot => {
        const venueProfileViews: VenueProfileView[] = [];

        querySnapshot.forEach(doc => {
          let data = doc.data();
          if (data.venueId == (this as any).venueId) {
            let profileView: VenueProfileView = {
              venueId: data.venueId,
              userId: data.userId,
              timestamp: data.timestamp.toDate()
            };
            venueProfileViews.push(profileView);
          }
        });

        (this as any).venueProfileViews = venueProfileViews;
      });
    },
    initCheckInsChart() {
      db.collection('venuecheckins').onSnapshot(querySnapshot => {
        const venueCheckIns: VenueCheckIn[] = [];

        querySnapshot.forEach(doc => {
          let data = doc.data();
          if (data.venueId == (this as any).venueId) {
            let checkIn: VenueCheckIn = {
              venueId: data.venueId,
              userId: data.userId,
              timeStamp: data.timeStamp.toDate()
            };
            venueCheckIns.push(checkIn);
          }
        });

        (this as any).venueCheckIns = venueCheckIns;
      });
    }
  }
};
</script>
