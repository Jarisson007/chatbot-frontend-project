var ctx = document.getElementById('myChart').getContext('2d');
var earning = document.getElementById('earning').getContext('2d');

var myChart = new Chart(ctx, {
  type: 'polarArea',
  data: {
    labels: ['May 2024', 'Jun 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024'],
    datasets: [{
      label: 'Custo de IA ao longo do Tempo',
      data: [500, 400, 350, 850, 1000, 1200],
      backgroundColor: [
        '#3BA6DB',  // 
        '#6A3BDB',  // 
        '#dc6378',  // 
        '#3B41DB',  // 
        '#779F74',  // 
        '#101652',  // 
        '#207178'   // 
    ],
      borderColor: [
        '#3BA6DB',  //
        '#6A3BDB',  // 
        '#dc6378',  // 
        '#3B41DB',  // 
        '#779F74',  // 
        '#101652',  // 
        '#207178'   // 
    ],  

    }]
  },
  options: {
        responsive: true, 
  }
});


var myChart = new Chart(earning, {
    type: 'bar',
    data: {
      labels: ['Fernanda', 'Rubens', 'Vinicius', 'Gabriel', 'Larissa', 'Jonas', 'Aline', 'Sandra', 'Daniel','Vitor','João', 'Flavio'],
      datasets: [{
        label: 'Uso de IA por usuário',
        data: [3324, 4204, 3550, 1850, 1507, 1245, 800, 145, 638, 277, 69, 552],
        backgroundColor: [
            '#021E52',
            '#779F74',  // 
            '#3BA6DB',  //
            '#808080',  // Cinza
            '#6A3BDB',  // 
            '#dc6378',  // 
            '#3B41DB',  // 
            '#101652',  // 
            '#207178'   // 
          ],
          
          borderWidth: 1 
  
      }]
    },
    options: {
          responsive: true, 
    }
  });