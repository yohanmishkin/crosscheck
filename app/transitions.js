export default function() {
  this.transition(
    this.fromRoute('disasters.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('disasters.disaster.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}