<template functional>
  <div class="step" :style="props.myStyle">
    <div class="step-text">{{ props.txt }}</div>

    <span class="pion pion0" :style="{display: props.pos[0] === props.numStep ? 'block' : 'none'}">
      <i class="material-icons usn" style="color: #fff; font-size: 22px">{{ props.numJoueur === 0 ? "directions_run" : "person" }}</i>
    </span>

    <span class="pion pion1" :style="{display: props.pos[1] === props.numStep ? 'block' : 'none'}">
      <i class="material-icons usn" style="color: #fff; font-size: 22px">{{ props.numJoueur === 1 ? "directions_run" : "person" }}</i>
    </span>

    <span class="pion pion2" :style="{display: props.pos[2] === props.numStep ? 'block' : 'none'}">
      <i class="material-icons usn" style="color: #fff; font-size: 22px">{{ props.numJoueur === 2 ? "directions_run" : "person" }}</i>
    </span>

    <span class="pion pion3" :style="{display: props.pos[3] === props.numStep ? 'block' : 'none'}">
      <i class="material-icons usn" style="color: #fff; font-size: 22px">{{ props.numJoueur === 3 ? "directions_run" : "person" }}</i>
    </span>

  </div>
</template>