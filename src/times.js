// game,hour,loopAfter,duration,clearStart,rainStart,snowStart
const timesCsv = `
cityfolk,0,111,98.16,2596,11479,7044
cityfolk,1,106,90.55,2715,11598,7163
cityfolk,2,142,136.65,2842,11725,7290
cityfolk,3,95,79.8,2993,11876,7440
cityfolk,4,55,46.5,3111,11995,7559
cityfolk,5,152,147.44,3173,12056,7670
cityfolk,6,81,78.15,3330,12214,7828
cityfolk,7,87,79.71,3420,12304,7918
cityfolk,8,56,53.08,3515,12398,8012
cityfolk,9,71,67.715,3578,12462,8076
cityfolk,10,82,77.6,3661,3661,3661
cityfolk,11,105,101.9,3753,12636,8250
cityfolk,12,173,170.42,3876,12759,8373
cityfolk,13,103,95.74,4073,12956,8570
cityfolk,14,122,106.36,4185,13068,8682
cityfolk,15,76,72.95,4315,13199,8813
cityfolk,16,97,91.65,4403,13286,8900
cityfolk,17,82,79.7,4513,13396,9010
cityfolk,18,109,107.75,4605,13488,9102
cityfolk,19,94,89.75,4724,13607,9222
cityfolk,20,152,147.45,4843,13726,9340
cityfolk,21,100,95.70,5003,13886,9500
cityfolk,22,184,181.25,5111,13994,9608
cityfolk,23,154,151.29,5309,14192,9806
`;
// newleaf,15,clear,67,59.75,2022,4554,4554

const TIMES = {
  cityfolk: {},
  newleaf: {},
  newhorizons:{},
}

timesCsv.split('\n').forEach((line) => {
  const parts = line.split(',');
  if (parts.length < 7) {
    return;
  }
  if (!TIMES[parts[0]][parts[1]]) {
    TIMES[parts[0]][parts[1]] = {};
  }
  TIMES[parts[0]][parts[1]].loopAfter = parseInt(parts[2]); // Time to wait before looping
  TIMES[parts[0]][parts[1]].duration = parseFloat(parts[3]); // How long to loop back
  TIMES[parts[0]][parts[1]].clearStart = parseFloat(parts[4]); // start time for clear weather
  TIMES[parts[0]][parts[1]].rainStart = parseFloat(parts[5]); // start time for rainy weather
  TIMES[parts[0]][parts[1]].snowStart = parseFloat(parts[6]); // start time for snowy weather
});

export default TIMES;
