// // كائن إدارة المهام
// const TaskManager = {
//     // مصفوفة المهام
//     tasks: [],

//     // أدوات مساعدة
//     utils: {
//         generateId: function() {
//             return Date.now() + Math.floor(Math.random() * 1000);
//         },
        
//         formatDate: function(dateString) {
//             const options = { 
//                 year: 'numeric', 
//                 month: 'short', 
//                 day: 'numeric' 
//             };
//             return new Date(dateString).toLocaleDateString('en-US', options);
//         }
//     },

//     // قائمة الأعضاء
//     members: [
//         { id: 1, name: 'John Doe', role: 'Developer', email: 'john@example.com' },
//         { id: 2, name: 'Jane Smith', role: 'Designer', email: 'jane@example.com' },
//         { id: 3, name: 'Mike Johnson', role: 'Project Manager', email: 'mike@example.com' },
//         { id: 4, name: 'Sarah Williams', role: 'Marketing Specialist', email: 'sarah@example.com' }
//     ],

//     // إضافة مهمة جديدة
//     addTask: function(taskData) {
//         const task = {
//             id: this.utils.generateId(),
//             title: taskData.title,
//             description: taskData.description,
//             dueDate: taskData.dueDate,
//             members: taskData.members || [],
//             priority: taskData.priority || 'medium',
//             status: taskData.status || 'todo',
//             createdAt: new Date()
//         };

//         this.tasks.push(task);
//         this.renderTasks();
//         return task;
//     },

//     // تحديث مهمة
//     updateTask: function(taskId, updatedData) {
//         const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        
//         if (taskIndex !== -1) {
//             this.tasks[taskIndex] = {
//                 ...this.tasks[taskIndex],
//                 ...updatedData
//             };
//             this.renderTasks();
//             return this.tasks[taskIndex];
//         }
        
//         return null;
//     },

//     // حذف مهمة
//     deleteTask: function(taskId) {
//         const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        
//         if (taskIndex !== -1) {
//             this.tasks.splice(taskIndex, 1);
//             this.renderTasks();
//         }
//     },

//     // عرض المهام
//     renderTasks: function(tasksToRender = this.tasks) {
//         const taskList = document.getElementById('taskList');
//         // taskList.innerHTML = '';

//         tasksToRender.forEach(task => {
//             const taskElement = document.createElement('div');
//             taskElement.classList.add('task-item', `priority-${task.priority}`);
//             taskElement.innerHTML = `
//                 <div class="task-content">
//                     <div class="task-header">
//                         <h4>${task.title}</h4>
//                         <span class="task-priority ${task.priority}">${task.priority} Priority</span>
//                     </div>
//                     <p>${task.description}</p>
//                     <div class="task-details">
//                         <h4>Due: ${this.utils.formatDate(task.dueDate)}</h4>
//                         <h4>Assigned: ${task.members.length > 0 ? task.members.join(', ') : 'No members'}</h4>
//                     </div>
//                 </div>
//                 <div class="task-actions">
//                     <button onclick="TaskManager.editTask(${task.id})">Edit</button>
//                     <button onclick="TaskManager.deleteTask(${task.id})">Delete</button>
//                 </div>
//             `;
//             // taskList.appendChild(taskElement);
//         });
//     },

//     // // تعديل مهمة
//     // editTask: function(taskId) {
//     //     const task = this.tasks.find(t => t.id === taskId);
//     //     if (!task) return;

//     //     // عرض نموذج التعديل
//     //     document.getElementById('editTaskId').value = task.id;
//     //     document.getElementById('editTaskTitle').value = task.title;
//     //     document.getElementById('editTaskDescription').value = task.description;
//     //     document.getElementById('editTaskDueDate').value = task.dueDate;
//     //     document.getElementById('editTaskPriority').value = task.priority;

//     //     // تحديد الأعضاء
//     //     const membersSelect = document.getElementById('editTaskMembers');
//     //     Array.from(membersSelect.options).forEach(option => {
//     //         option.selected = task.members.includes(option.text);
//     //     });

//     //     // عرض النموذج
//     //     document.getElementById('editModal').style.display = 'block';
//     //     document.getElementById('modalOverlay').style.display = 'block';
//     // },

//     // البحث والفلترة
//     searchAndFilterTasks: function() {
//         const priorityFilter = document.getElementById('priorityFilter').value;
//         const statusFilter = document.getElementById('statusFilter').value;
//         const searchInput = document.getElementById('searchInput').value.toLowerCase();
//         const sortBy = document.getElementById('sortSelect').value;
//         const sortOrder = document.getElementById('sortOrder').value;

//         let filteredTasks = this.tasks.filter(task => {
//             // فلترة الأولوية
//             if (priorityFilter && task.priority !== priorityFilter) return false;
            
//             // فلترة الحالة
//             if (statusFilter && task.status !== statusFilter) return false;
            
//             // البحث
//             if (searchInput) {
//                 const searchTerms = searchInput.toLowerCase();
//                 if (!task.title.toLowerCase().includes(searchTerms) && 
//                     !task.description.toLowerCase().includes(searchTerms)) return false;
//             }
            
//             return true;
//         });

//         // الترتيب
//         filteredTasks.sort((a, b) => {
//             let comparison = 0;
//             switch (sortBy) {
//                 case 'dueDate':
//                     comparison = new Date(a.dueDate) - new Date(b.dueDate);
//                     break;
//                 case 'priority':
//                     const priorityOrder = { low: 1, medium: 2, high: 3 };
//                     comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
//                     break;
//                 case 'title':
//                     comparison = a.title.localeCompare(b.title);
//                     break;
//             }
//             return sortOrder === 'asc' ? comparison : -comparison;
//         });

//         this.renderTasks(filteredTasks);
//     },

//     // توليد مهام تجريبية
//     generateSampleTasks: function() {
//         const sampleTasks = [
//             {
//                 title: 'Marketing Campaign',
//                 description: 'Develop quarterly digital marketing strategy',
//                 dueDate: '2024-04-01',
//                 members: ['Mike Johnson'],
//                 priority: 'medium',
//                 status: 'todo'
//             },
//             {
//                 title: 'Design Website',
//                 description: 'Create a new responsive website design',
//                 dueDate: '2024-03-15',
//                 members: ['John Doe', 'Jane Smith'],
//                 priority: 'high',
//                 status: 'in-progress'
//             },
//             {
//                 title: 'Marketing Campaign',
//                 description: 'Develop quarterly digital marketing strategy',
//                 dueDate: '2024-04-01',
//                 members: ['Mike Johnson'],
//                 priority: 'medium',
//                 status: 'todo'
//             },
//             {
//                 title: 'Client Report',
//                 description: 'Prepare comprehensive annual client report',
//                 dueDate: '2024-02-28',
//                 members: ['Sarah Williams'],
//                 priority: 'low',
//                 status: 'completed'
//             },
//             {
//                 title: 'Marketing Campaign',
//                 description: 'Develop quarterly digital marketing strategy',
//                 dueDate: '2024-04-01',
//                 members: ['Mike Johnson'],
//                 priority: 'medium',
//                 status: 'todo'
//             }
//         ];

//         sampleTasks.forEach(task => this.addTask(task));
//     },

//     // تهيئة الصفحة
//     init: function() {
//         // إضافة مستمعي الأحداث
//         document.getElementById('taskForm').addEventListener('submit', (e) => {
//             e.preventDefault();
//             this.addTask({
//                 title: document.getElementById('taskTitle').value,
//                 description: document.getElementById('taskDescription').value,
//                 dueDate: document.getElementById('taskDueDate').value,
//                 members: Array.from(document.getElementById('taskMembers').selectedOptions)
//                     .map(option => option.text),
//                 priority: document.getElementById('taskPriority').value
//             });
//             e.target.reset();
//         });

//         // نموذج التعديل
//         document.getElementById('editTaskForm').addEventListener('submit', (e) => {
//             e.preventDefault();
//             const taskId = parseInt(document.getElementById('editTaskId').value);
//             this.updateTask(taskId, {
//                 title: document.getElementById('editTaskTitle').value,
//                 description: document.getElementById('editTaskDescription').value,
//                 dueDate: document.getElementById('editTaskDueDate').value,
//                 members: Array.from(document.getElementById('editTaskMembers').selectedOptions)
//                     .map(option => option.text),
//                 priority: document.getElementById('editTaskPriority').value
//             });
//             document.getElementById('editModal').style.display = 'none';
//             document.getElementById('modalOverlay').style.display = 'none';
//         });

//         // إغلاق نموذج التعديل
//         document.getElementById('cancelEdit').addEventListener('click', () => {
//             document.getElementById('editModal').style.display = 'none';
//             document.getElementById('modalOverlay').style.display = 'none';
//         });

//         // مستمعي أحداث الفلترة والبحث
//         document.getElementById('priorityFilter').addEventListener('change', () => this.searchAndFilterTasks());
//         document.getElementById('statusFilter').addEventListener('change', () => this.searchAndFilterTasks());
//         document.getElementById('searchInput').addEventListener('input', () => this.searchAndFilterTasks());
//         document.getElementById('sortSelect').addEventListener('change', () => this.searchAndFilterTasks());
//         document.getElementById('sortOrder').addEventListener('change', () => this.searchAndFilterTasks());

//         // توليد مهام تجريبية
//         this.generateSampleTasks();
//     }
// };


// TaskManager.init();
// ///////////////////////////////
// class TeamMemberManagerer {
//     constructor() {
//         this.members = [];
//         this.tasks = {};
//         this.initializeMembers();
//         this.bindEvents();
//     }

//     initializeMembers() {
//         // Sample members
//         const sampleMemberss = [
//             { id: 1, name: 'John Doe', role: 'Developer', email: 'john@example.com' },
//             { id: 2, name: 'Jane Smith', role: 'Designer', email: 'jane@example.com' },
//             { id: 3, name: 'Mike Johnson', role: 'Project Manager', email: 'mike@example.com' },
//             { id: 4, name: 'Sarah Williams', role: 'Marketing Specialist', email: 'sarah@example.com' }
//         ];

//         this.memberss = sampleMemberss;
//         this.renderMemberss();
//     }

//     renderMemberss() {
//         const membersList = document.getElementById('membersList');
//         membersList.innerHTML = '<h2>Team Members</h2>';

//         this.memberss.forEach(member => {
//             const memberCard = document.createElement('div');
//             memberCard.classList.add('member-card');
//             memberCard.innerHTML = `
//                 <h3>${member.name}</h3>
//                 <p>${member.role}</p>
//                 <small>${member.email}</small>
//             `;
//             memberCard.dataset.memberId = member.id;
//             memberCard.addEventListener('click', () => this.showMemberDetails(member));
//             membersList.appendChild(memberCard);
//         });
//     }

//     showMemberDetails(member) {
//         // Update selected member name
//         document.getElementById('selectedMemberName').textContent = member.name;
        
//         // Set member ID in hidden input
//         document.getElementById('memberId').value = member.id;

//         // Load member's tasks
//         this.renderMemberTasks(member.id);
//     }

//     bindEvents() {
//         document.getElementById('taskForm').addEventListener('submit', this.addTask.bind(this));
//     }

//     addTask(e) {
//         e.preventDefault();
        
//         const memberId = document.getElementById('memberId').value;
        
//         if (!memberId) {
//             alert('Please select a member first');
//             return;
//         }

//         const task = {
//             id: Date.now(),
//             title: document.getElementById('taskTitle').value,
//             description: document.getElementById('taskDescription').value,
//             dueDate: document.getElementById('taskDueDate').value,
//             priority: document.getElementById('taskPriority').value,
//             status: document.getElementById('taskStatus').value
//         };

//         // Initialize tasks array for member if not exists
//         if (!this.tasks[memberId]) {
//             this.tasks[memberId] = [];
//         }

//         // Add task to member's tasks
//         this.tasks[memberId].push(task);

//         // Render tasks
//         this.renderMemberTasks(memberId);

//         // Reset form
//         e.target.reset();
//     }

//     renderMemberTasks(memberId) {
//         const taskList = document.getElementById('taskList');
//         taskList.innerHTML = '<h3>Member Tasks</h3>';

//         // Get member's tasks
//         const memberTasks = this.tasks[memberId] || [];

//         if (memberTasks.length === 0) {
//             taskList.innerHTML += '<p>No tasks assigned</p>';
//             return;
//         }

//         memberTasks.forEach(task => {
//             const taskElement = document.createElement('div');
//             taskElement.classList.add('task-item', `priority-${task.priority}`);
//             taskElement.innerHTML = `
//                 <div>
//                     <strong>${task.title}</strong>
//                     <p>${task.description}</p>
//                     <div>
//                         <small>Due: ${task.dueDate}</small>
//                         <small> | Priority: ${task.priority}</small>
//                         <small> | Status: ${task.status}</small>
//                     </div>
//                 </div>
//                 <div class="task-actions">
//                     <button onclick="teamManager.editTask(${memberId}, ${task.id})">Edit</button>
//                     <button onclick="teamManager.deleteTask(${memberId}, ${task.id})">Delete</button>
//                 </div>
//             `;
// //            taskList.appendChild(taskElement);
//         });
//     }

//     editTask(memberId, taskId) {
//         // Find the task
//         const memberTasks = this.tasks[memberId];
//         const taskIndex = memberTasks.findIndex(t => t.id === taskId);

//         if (taskIndex !== -1) {
//             const task = memberTasks[taskIndex];
            
//             // Populate form with task details
//             document.getElementById('taskTitle').value = task.title;
//             document.getElementById('taskDescription').value = task.description;
//             document.getElementById('taskDueDate').value = task.dueDate;
//             document.getElementById('taskPriority').value = task.priority;
//             document.getElementById('taskStatus').value = task.status;

//             // Remove the original task
//             memberTasks.splice(taskIndex, 1);

//             // Re-render tasks
//             this.renderMemberTasks(memberId);
//         }
//     }

//     deleteTask(memberId, taskId) {
//         // Remove task from member's tasks
//         this.tasks[memberId] = this.tasks[memberId].filter(task => task.id !== taskId);

//         // Re-render tasks
//         this.renderMemberTasks(memberId);
//     }
// }

// // Initialize Team Member Manager
// const teamManagerer = new TeamMemberManagerer();