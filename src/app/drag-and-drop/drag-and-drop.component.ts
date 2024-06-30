import {Component, OnInit} from '@angular/core';

interface DragItem {
  name: string;
  cols: number;
  rows: number;
  draggable: boolean;
}


@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {
  itemsDrag: DragItem[] = [
    {name: 'Item 1', cols: 1, rows: 1, draggable: true},
    {name: 'Item 2x', cols: 2, rows: 1, draggable: true},
    {name: 'Item 4x', cols: 2, rows: 2, draggable: true},
    {name: 'Item 1', cols: 1, rows: 1, draggable: true},
    {name: 'Item 2x', cols: 2, rows: 1, draggable: true},
    {name: 'Item 4x', cols: 2, rows: 2, draggable: true},
    {name: 'Item 1', cols: 1, rows: 1, draggable: true},
    {name: 'Item 2x', cols: 2, rows: 1, draggable: true},
    {name: 'Item 4x', cols: 2, rows: 2, draggable: true},
    {name: 'Item 1', cols: 1, rows: 1, draggable: true},
    {name: 'Item 2x', cols: 2, rows: 1, draggable: true},
    {name: 'Item 4x', cols: 2, rows: 2, draggable: true},
    {name: 'Item 1', cols: 1, rows: 1, draggable: true},
    {name: 'Item 2x', cols: 2, rows: 1, draggable: true},
    {name: 'Item 4x', cols: 2, rows: 2, draggable: true},
  ];
  gridPositions: { occupied: boolean, item: DragItem | null } [] = this.initializeGrid();
  currentDraggedItem: DragItem | null = null;
  currentPosition: number = -1;

  ngOnInit() {
    const array = localStorage.getItem('array');
    if (array) {
      this.gridPositions = JSON.parse(array);
    }
  }

  initializeGrid() {
    return Array.from({length: 20}, () => ({occupied: false, item: null}));
  }

  drop() {
    if (!this.checkOccupied(0)) {
      if (this.currentDraggedItem?.cols === 2 && this.currentDraggedItem.rows === 1) {
        this.place2xItem();
        return;
      }
      if (this.currentDraggedItem?.cols === 2 && this.currentDraggedItem.rows === 2) {
        this.placeSquareItem();
        return;
      }
      this.occupied = 0;
      this.occupiedItem = 0;
    }
  }

  place2xItem() {
    if (this.currentPosition === 9 || this.currentPosition === 19) {
      if (this.checkOccupied(-1)) return;
      this.occupied = 0;
      this.occupied = -1;
      this.occupiedItem = -1;
    } else {
      if (this.checkOccupied(1)) return;
      this.occupied = 0;
      this.occupied = 1;
      this.occupiedItem = 0;
    }
  }

  placeSquareItem() {
    if (this.currentPosition === 9) {
      if (this.checkOccupied(-1) || this.checkOccupied(9) || this.checkOccupied(10)) return;
      this.occupiedItem = -1;
      this.occupied = 0;
      this.occupied = -1;
      this.occupied = 9;
      this.occupied = 10;
      return;
    }
    if (this.currentPosition === 19) {
      if (this.checkOccupied(-1) || this.checkOccupied(-11) || this.checkOccupied(-10)) return;
      this.occupiedItem = -11;
      this.occupied = 0;
      this.occupied = -1;
      this.occupied = -11;
      this.occupied = -10;
      return;
    }
    if (this.currentPosition < 9) {
      if (this.checkOccupied(11) || this.checkOccupied(10) || this.checkOccupied(1)) return;
      this.occupiedItem = 0;
      this.occupied = 0;
      this.occupied = 1;
      this.occupied = 10;
      this.occupied = 11;
      return;
    }
    if (this.currentPosition > 9) {
      if (this.checkOccupied(-9) || this.checkOccupied(-10) || this.checkOccupied(1)) return;
      this.occupiedItem = -10;
      this.occupied = 0;
      this.occupied = -9;
      this.occupied = -10;
      this.occupied = 1;
    }
  }

  set occupied(distance: number) {
    this.getGridItem(distance).occupied = true;
  }

  set occupiedItem(distance: number) {
    this.getGridItem(distance).item = this.currentDraggedItem;
  }

  checkOccupied(distance: number): boolean {
    return this.getGridItem(distance).occupied;
  }

  getGridItem(distance: number) {
    return this.gridPositions[this.currentPosition + distance];
  }

  onDragStart(item: DragItem) {
    this.currentDraggedItem = item;
  }

  onMouseEnter(i: number) {
    this.currentPosition = i;
  }

  onMouseLeave() {
    this.currentPosition = -1;
  }

  onSave() {
    localStorage.setItem('array', JSON.stringify(this.gridPositions));
  }

  onRemoveItem(pos: { occupied: boolean, item: DragItem | null }) {
    if (pos.occupied) {
      const index = this.gridPositions.findIndex(p => p === pos);
      if (pos.item) {
        this.itemsDrag.push(pos.item);
      }
      this.gridPositions[index].occupied = false;
      this.gridPositions[index].item = null;
    }
  }

  onReset() {
    this.gridPositions = Array.from({length: 20}, () => ({occupied: false, item: null}));
    localStorage.removeItem('array');
  }
}
