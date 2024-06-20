import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

interface DragItem {
  name: string;
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent {
  itemsDrag: DragItem[] = [
    { name: 'Item 1', cols: 1, rows: 1 },
    { name: 'Item 2', cols: 2, rows: 1 },
    { name: 'Item 3', cols: 2, rows: 2 },
    { name: 'Item 4', cols: 1, rows: 1 },
    { name: 'Item 5', cols: 2, rows: 1 },
    { name: 'Item 6', cols: 2, rows: 2 },
    { name: 'Item 7', cols: 1, rows: 1 },
    { name: 'Item 8', cols: 2, rows: 1 },
    { name: 'Item 9', cols: 2, rows: 2 }
  ];
  gridPositions: { occupied: boolean, item: DragItem | null }[] = Array.from({ length: 20 }, () => ({ occupied: false, item: null }));
  currentDraggedItem: DragItem | null = null;
  currentPosition: number = -1;

  drop(event: CdkDragDrop<any>) {
      if (!this.gridPositions[this.currentPosition].occupied) {

        //4 blocs
        if(this.currentDraggedItem?.rows === 2) {
          const firstCondition: boolean = this.currentPosition < 9;
          const secondCondition: boolean = this.currentPosition === 9;
          const thirdCondition: boolean = this.currentPosition === 19;
          const fourthCondition: boolean = this.currentPosition > 9 && !thirdCondition;
          const firstIndex: number = firstCondition || fourthCondition ? this.currentPosition + 1 : this.currentPosition - 1;
          const secondIndex: number = this.currentPosition <= 9 ? this.currentPosition + 10 : this.currentPosition - 10;
          const thirdIndex: number = firstCondition ? this.currentPosition + 11 : secondCondition? this.currentPosition + 9 : thirdCondition ? this.currentPosition - 11 : fourthCondition? this.currentPosition - 9 : -1;
          if (!(this.gridPositions[firstIndex].occupied || this.gridPositions[secondIndex].occupied || this.gridPositions[thirdIndex].occupied)) {
            this.gridPositions[this.currentPosition].occupied = true;
            if (firstCondition) {
              this.gridPositions[firstIndex].occupied = true;
              this.gridPositions[secondIndex].occupied = true;
              this.gridPositions[thirdIndex].occupied = true;
              this.gridPositions[this.currentPosition].item = this.currentDraggedItem;
              this.itemsDrag.splice(event.previousIndex, 1);
              return;
            }
            if (secondCondition) {
              this.gridPositions[firstIndex].occupied = true;
              this.gridPositions[secondIndex].occupied = true;
              this.gridPositions[thirdIndex].occupied = true;
              this.gridPositions[firstIndex].item = this.currentDraggedItem;
              this.itemsDrag.splice(event.previousIndex, 1);
              return;
            }
            if (thirdCondition) {
              this.gridPositions[firstIndex].occupied = true;
              this.gridPositions[secondIndex].occupied = true;
              this.gridPositions[thirdIndex].occupied = true;
              this.gridPositions[thirdIndex].item = this.currentDraggedItem;
              this.itemsDrag.splice(event.previousIndex, 1);
              return;
            }
            if (fourthCondition) {
              this.gridPositions[firstIndex].occupied = true;
              this.gridPositions[secondIndex].occupied = true;
              this.gridPositions[thirdIndex].occupied = true;
              this.gridPositions[secondIndex].item = this.currentDraggedItem;
              this.itemsDrag.splice(event.previousIndex, 1);
              return;
            }
          }
        }

        // 2 blocs
        if(this.currentDraggedItem?.cols === 2 && this.currentDraggedItem?.rows === 1) {
          this.gridPositions[this.currentPosition].occupied = true;

          if(this.currentPosition === 9 || this.currentPosition === 19) {
            this.gridPositions[this.currentPosition - 1].occupied = true;
            this.gridPositions[this.currentPosition - 1].item = this.currentDraggedItem;
            return;
          }
          this.gridPositions[this.currentPosition + 1].occupied = true;
          this.gridPositions[this.currentPosition].item = this.currentDraggedItem;
          return;
        }
        this.gridPositions[this.currentPosition].item = this.currentDraggedItem;
      }
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

  onRemoveItem(pos:{ occupied: boolean, item: DragItem | null }) {
    if (pos.occupied) {
      const index = this.gridPositions.findIndex(p => p === pos);
      if (pos.item) {
        this.itemsDrag.push(pos.item);
      }
      this.gridPositions[index].occupied = false;
      this.gridPositions[index].item = null;
    }
  }
}
