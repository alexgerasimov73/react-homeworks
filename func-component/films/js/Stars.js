'use strict';

function Stars({count}) {
  if (count < 1 || count > 5 || typeof(count) != "number") {
    return null;
  } 
  const amountOfStars = [];
  for (let i = 0; i < count; i++) {
    amountOfStars.push(<Star />)
  }
  return (
    <ul class="card-body-stars u-clearfix">
      {amountOfStars}
    </ul>    
  )
}