/**
 * @name utility.js
 * @author The World Wolf 95
 * @description
 *    This file contains the utilities functions
 */

import Http from './http.js';

export default {
    /**
     * @name startSpinner
     * @param {String} message
     * @description
     *    This function permits to start the spinner
     */
    startSpinner(message = 'Chargement...') {
        $('body').waitMe({
            effect: 'roundBounce',
            text: message,
            bg: 'rgba(255,255,255,0.7)',
            color: '#000',
            fontSize: '52px'
        });
    },

    /**
     * @name stopSpinner
     * @description
     *    This function permits to stop the spinner.
     */
    stopSpinner() {
        $('body').waitMe('hide');
    },

    /**
     * @name getLevelIdByName
     * @param {String} levelName
     * @description
     *      This function permits to give the id of level identified by its key name
     */
    getLevelIdByName(levelName) {
        const levels = JSON.parse(localStorage.getItem("levels"));
        var levelId = null;
        if (levels) {
            for (var level of levels) {
                if (level.name === levelName) {
                    levelId = level.id;
                }
            }
        }
        return levelId;
    },

    /**
     * @name getLevelNameByKey
     * @param {String} levelKey
     * @description
     *      This function returns the name of level by the level key
     */
    getLevelNameByKey(levelKey) {
        switch (levelKey) {
            case "PRIMARY":
                return "Primaire";
                break;
            case "COLLEGE":
                return "Collège";
                break;
            case "HIGH_SCHOOL":
                return "Lycée";
                break;
            case "UNIVERSITY":
                return "Université";
                break;
            default:
                return "Inconnu";
                break;
        }
    },

    /**
     * @name getLevelNameById
     * @param {String} levelId
     * @description
     *      This function returns the name of level by the level id
     */
    getLevelNameById(levelId) {
        const levels = JSON.parse(localStorage.getItem('levels'));
        var levelKey = null;
        for (var level of levels) {
            if (level.id === levelId) {
                levelKey = level.name;
            }
        }
        return this.getLevelNameByKey(levelKey);
    },

    /**
     * @name getLevelsKey
     * @description
     *      This function returns the array of level keys
     */
    getLevelsKey() {
        var levelKeys = [];
        const levels = JSON.parse(localStorage.getItem('levels'));
        for (var level of levels) {
            levelKeys.push(level.name);
        }
        return levelKeys;
    },

    /**
     * @name getStringInCapitalize
     * @param {String} words
     * @description
     *      This function put in capitalize each word of words.
     */
    getStringInCapitalize(words) {
        const listOfWord = words.split(" ");
        var listOfWordInCapitalize = [];
        for (var word of listOfWord) {
            listOfWordInCapitalize.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        }
        return listOfWordInCapitalize.join(" ");
    },

    /**
     * @name isLevel
     * @param {String} val
     * @description
     *      This function verifies if a param is a id of level
     */
    isLevel(val) {
        const levels = JSON.parse(localStorage.getItem('levels'));
        var isLevel = false;
        for (var level of levels) {
            if (level.id === val) {
                isLevel = true;
            }
        }
        return isLevel;
    },

    /**
     * @name isLevelSubject
     * @param {String} levelId
     * @param {String} val
     * @description
     *      This function permits to verify if a val is a id of level subject.
     */
    isLevelSubject(levelId, val) {
        const levelSubjects = JSON.parse(localStorage.getItem(levelId + "_SUBJECTS"));
        var isLevelSubject = false;
        if (levelSubjects) {
            for (var subject of levelSubjects) {
                if (subject.id === val) {
                    isLevelSubject = true;
                }
            }
        }
        return isLevelSubject;
    },

     /**
     * @name isLevelClassroom
     * @param {String} levelId
     * @param {String} val
     * @description
     *      This function permits to verify if a val is a id of level classroom.
     */
    isLevelClassroom(levelId, val) {
        const levelClassrooms = JSON.parse(localStorage.getItem(levelId + "_CLASSROOMS"));
        var isLevelClassroom = false;
        if (levelClassrooms) {
            for (var subject of levelClassrooms) {
                if (subject.id === val) {
                    isLevelClassroom = true;
                }
            }
        }
        return isLevelClassroom;
    },

    /**
     * @name isLevelStudent
     * @param {String} levelId
     * @param {String} val
     * @description
     *      This function permits to verify if a val is a id of level student.
     */
    isLevelStudent(levelId, val) {
        const levelStudents = JSON.parse(localStorage.getItem(levelId + "_STUDENTS"));
        var isLevelStudent = false;
        if (levelStudents) {
            for (var student of levelStudents) {
                if (student.id === val) {
                    isLevelStudent = true;
                }
            }
        }
        return isLevelStudent;
    },

    /**
     * @name isLevelTeacher
     * @param {String} levelId
     * @param {String} val
     * @description
     *      This function permits to verify if a val is a id of level teacher.
     */
    isLevelTeacher(levelId, val) {
        const levelTeachers = JSON.parse(localStorage.getItem(levelId + "_TEACHERS"));
        var isLevelTeacher = false;
        if (levelTeachers) {
            for (var teacher of levelTeachers) {
                if (teacher.id === val) {
                    isLevelTeacher = true;
                }
            }
        }
        return isLevelTeacher;
    },
    /**
     * @name refreshObjectsCount
     * @description
     *      This function permits to update the count of objects on index page.
     */
    async refreshObjectsCount() {
        const response = await Http.getObjectsCount();
        if (response && response.status == 200) {
            // Update count
            document.getElementById("txtSubjectNumber").innerText = response.data.data.SUBJECTS_COUNT;
            document.getElementById("txtStudentNumber").innerText = response.data.data.STUDENTS_COUNT;
            document.getElementById("txtTeacherNumber").innerText = response.data.data.TEACHERS_COUNT;
            document.getElementById("txtClassroomNumber").innerText = response.data.data.CLASSROOMS_COUNT;
            // Update local storage
            localStorage.setItem("SUBJECTS_COUNT", JSON.stringify(response.data.data.SUBJECTS_COUNT));
            localStorage.setItem("STUDENTS_COUNT", JSON.stringify(response.data.data.STUDENTS_COUNT));
            localStorage.setItem("TEACHERS_COUNT", JSON.stringify(response.data.data.TEACHERS_COUNT));
            localStorage.setItem("CLASSROOMS_COUNT", JSON.stringify(response.data.data.CLASSROOMS_COUNT));
        } else {
            // Set 0 in objects count
            document.getElementById("txtSubjectNumber").innerText = localStorage.getItem("SUBJECTS_COUNT") || 0;
            document.getElementById("txtStudentNumber").innerText = localStorage.getItem("STUDENTS_COUNT") || 0;
            document.getElementById("txtTeacherNumber").innerText = localStorage.getItem("TEACHERS_COUNT") || 0;
            document.getElementById("txtClassroomNumber").innerText = localStorage.getItem("CLASSROOMS_COUNT") || 0;
        }
    },

    /**
     * @name getAge
     * @param {Date} date
     * @description
     *      This function permit to calculate the age
     */
    getAge(date) {
        var newDate = new Date(date);
        var today = new Date();
        return today.getFullYear() - newDate.getFullYear();
    }

};