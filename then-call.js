    /*
    *
    *
    *
    *
    *
    *
    *
    *
    *
    *
    *
    *
    *
    */
    
    'use strict';

    function Task(name, callback) {
        this.name = name || null;
        this.func = callback || function () { };
    }

    function TaskManager(nameOfManager) {
        this.name = nameOfManager;
        this.list = []; // List of tasks
        this.indexedTasks = [];
        this.counter = 0;
        this.runningTasks = 0;
        this.onCompleteFunc = null;
    }

    /**
     * Adds a task
     * @param {Task} item This will be a Task Object with a name and a function
     */
    TaskManager.prototype.add = function add(item) {
        var task = item;

        // Support for skipping the Task instansiation
        if (arguments.length === 2) {
            task = new Task(arguments[0], arguments[1]);
        }

        var index = this.list.length;
        var taskName = task.name || (this.name + this.counter++);
        this.list.push(task);

        // Indexing tasks by task name, group them into an array
        if (!this.list[taskName]) {
            this.list[taskName] = [];
        }
        // We can have multiple tasks with the same name
        this.list[taskName].push(this.list[index]);
    };

    TaskManager.prototype.addMultiple = function addMultiple(items) {
        for(var i = 0; i < items.length; i++){
            var task = items[i];

            var index = this.list.length;
            var taskName = task.name || (this.name + this.counter++);
            this.list.push(task);

            // Indexing tasks by task name, group them into an array
            if (!this.list[taskName]) {
                this.list[taskName] = [];
            }
            // We can have multiple tasks with the same name
            this.list[taskName].push(this.list[index]);
        }  
    };

    /**
     * Removes a task / group of tasks with the same task name, you cannot remove a
     * specific task within the group of tasks. Please use unique task names for
     * specific tasks to be removed.
     * @param  {string} taskName    The taskName is the group of task
     */
    TaskManager.prototype.remove = function remove(taskName) {
        var task = this.list[taskName];
        if (task) {

            for (var i = 0; i < task.length; i++) {
                var index = this.list.indexOf(task[i]);
                this.list.splice(index, 1);
            }
            delete this.list[taskName];

        } else {
            console.log("Task not found");
        }
    };

    /**
     * Runs all the tasks in the task list in FIFO order.  It also allows the user
     * to provide a final callback function for once all tasks have run successfully.
     * But the use of
     * @param  {Function} callback This will be called once all tasks have completed running.
     */
    TaskManager.prototype.run = function run(callback) {
        if (callback) {
            if (this.onCompleteFunc) {
                console.warn("TaskManager > onCompleteFunc already exist, overriding!");
            }
            this.onCompleteFunc = callback;
            this.runningTasks = this.list.length;
        }
        // If no extra tasks to run but callback is provided
        if (this.runningTasks === 0 && (callback || this.onCompleteFunc)) {
            callback ? callback() : this.onCompleteFunc();
        } else {
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].func();
            }
        }
    };

    /**
     * Run Next is a blocking synced function call, it will run in a FIFO order but
     * removes the the function as soon as its ran; the user will have to call
     * runOnce again for the next function.
     */
    TaskManager.prototype.runNext = function runNext(callback) {
        
        if(callback){
            this.onCompleteFunc = callback;
        }

        var task = this.list.shift();
        if (task) {
            task.func();
        } else {
            if(this.onCompleteFunc){
                this.onCompleteFunc();
            }
        }
    }

    /**
     * This function is the marker function for when a tasks completes running,
     * we use this function in conjunction with the run(callback) function when we
     * do pass in a callback function and want something else to run on complete
     */
    TaskManager.prototype.taskCompleted = function taskCompleted() {
        this.runningTasks--;
        if (this.runningTasks === 0) {
            if (this.onCompleteFunc) {
                var callback = this.onCompleteFunc.func || this.onCompleteFunc;
                callback();
            }
        }
    };

    TaskManager.prototype.reset = function reset() {
        if(this.list && this.runningTasks === 0){
            this.runningTasks = this.list.length;
        }
    };

    TaskManager.prototype.emtpy = function emtpy() {
        delete this.list; // List of tasks
        delete this.counter;
        delete this.runningTasks;
        delete this.onCompleteFunc;

        this.list = []; // List of tasks
        this.counter = 0;
        this.runningTasks = 0;
        this.onCompleteFunc = null;
    };

    TaskManager.prototype.info = function info() {
        return {
            name : this.name,
            tasks : this.list,
            toRun : this.runningTasks,
            onCompleteFunc : this.onCompleteFunc
        }
        
    };


    module.exports = {
        Task : Task,
        TaskManager : TaskManager
    };