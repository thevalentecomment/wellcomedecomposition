

function select(i) {
  return document.querySelector(i)
}



current_index = 0
play_direction = true

select('#body-video').onloadedmetadata = () => {
  breaks = [0, 3.6, 9.1, 13.6, select('#body-video').duration]
  select('#body-vdeo').play()
  setTimeout(function() {
    select('#body-vdeo').play()
    select('#body-vdeo').currentTime = 0
  }, 1000)
}

select('#body-video').ontimeupdate = () => {
  if (play_direction) {
    if (select('#body-video').currentTime >= breaks[current_index]) {
      select('#body-video').pause()
      // select('#next').disabled = false
    }
  } else {
    if (select('#body-video').currentTime <= breaks[current_index]) {
      select('#body-video').pause()
      // select('#back').disabled = false
    }
  }
}

select('#body-video').onpause = () => {
  button_disable()
}

function button_disable() {
  if (current_index == 0) {
    select('#back').disabled = true
    select('#next').disabled = false
  } else if (current_index == 4) {
    select('#next').disabled = true
    select('#back').disabled = false
  } else {
    select('#back').disabled = false
    select('#next').disabled = false
  }
}


select('#next').onclick = () => {
  if (current_index < 4) {
    current_index++
    select('#body-video').playbackRate = 1
    play_direction = true
    select('#body-video').play()
    text()
    select('#next').disabled = true
  }
}

select('#back').onclick = () => {
  if (current_index > 0) {
    current_index--
    select('#body-video').playbackRate = -1
    play_direction = false
    select('#body-video').play()
    text()
    select('#back').disabled = true
  }
}



function text() {
  var x = document.querySelectorAll('.container.text .description')
  for (var i = 0; i < x.length; i++) {
    x[i].classList.add('display-none1')
  }
  x[current_index].classList.remove('display-none1')

  x = document.querySelectorAll('.container.visuals .sidebar .timescale')
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove('selected')
  }
  x[current_index].classList.add('selected')
}


function skip(i) {
  current_index = i
  select('#body-video').currentTime = breaks[current_index]
  button_disable()
  text()
}
