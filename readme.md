#Setup 
```
var TaskMan = require('then-call'),
    Queue   = new TaskMan.TaskManager('Manager'),
    Task    =  TaskMan.Task;
```
# Usage
## When order doesn't matter
```
function createTask(TaskManager, name){
    return new Task(name, function(){
        setTimeout(() => {
            console.log('Finished Task called: ', name);
            TaskManager.taskCompleted(); 
        }, (Math.random() * 1000) );    
    });
};

var task1 = createTask(Queue, 'Task 1');
var task2 = createTask(Queue, 'Task 2');
var task3 = createTask(Queue, 'Task 3');
var task4 = createTask(Queue, 'Task 4');
var task5 = createTask(Queue, 'Task 5');
var task6 = createTask(Queue, 'Task 6');
var task7 = createTask(Queue, 'Task 7');
var task8 = createTask(Queue, 'Task 8');

Queue.add(task1);
Queue.add(task2);
Queue.add(task3);


Queue.addMultiple([
    task4,
    task5,
    task6,
    task7,
    task8
]);



Queue.run(function(){
    console.log('all done');
});
```
######Output
```
//Finished Task called:  Task 4
//Finished Task called:  Task 7
//Finished Task called:  Task 6
//Finished Task called:  Task 3
//Finished Task called:  Task 1
//Finished Task called:  Task 2
//Finished Task called:  Task 8
//Finished Task called:  Task 5
//all done
```

## When order does matter
```
var TaskMan = require('then-call'),
    Queue   = new TaskMan.TaskManager('Manager'),
    Task    =  TaskMan.Task;
Math.random();

function createTask(TaskManager, name){
    return new Task(name, function(){
        setTimeout(() => {
            console.log('Finished Task called: ', name);
            TaskManager.runNext(); 
        }, (Math.random() * 1000) );    
    });
};

var task1 = createTask(Queue, 'Task 1');
var task2 = createTask(Queue, 'Task 2');
var task3 = createTask(Queue, 'Task 3');
var task4 = createTask(Queue, 'Task 4');
var task5 = createTask(Queue, 'Task 5');
var task6 = createTask(Queue, 'Task 6');
var task7 = createTask(Queue, 'Task 7');
var task8 = createTask(Queue, 'Task 8');

Queue.add(task1);
Queue.add(task2);
Queue.add(task3);


Queue.addMultiple([
    task4,
    task5,
    task6,
    task7,
    task8
]);



Queue.runNext(function(){
    console.log('all done');
});

// or for no callback
// Queue.runNext();
```
######Output
```
//Finished Task called:  Task 1
//Finished Task called:  Task 2
//Finished Task called:  Task 3
//Finished Task called:  Task 4
//Finished Task called:  Task 5
//Finished Task called:  Task 6
//Finished Task called:  Task 7
//Finished Task called:  Task 8
//all done
```


## Functions

```

//Set up
var TaskMan = require('then-call');
var Queue   = new TaskMan.TaskManager('Manager');
var Task    =  TaskMan.Task;

Queue.add
Queue.addMultiple
Queue.remove
Queue.run
Queue.runNext
Queue.taskCompleted
Queue.reset
Queue.emtpy
Queue.info

```


