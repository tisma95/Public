"""
    Liste des fonctions de lecture et écriture dans la base de données.
    Author : The World Wolf 95
"""
#=> Code 200 : Operation successfuly
#=> Code 201 : Created Successfully
#=> Code 500 : Data base error
#=> Code 400 : Bad Request
#=> Code 404 : Not Found

import json
import i18n
import translations

i18n.set("locale", "en")

def saving_in_file(filePath, data):
    """
        Saving the data in file
    """
    print("Function " + saving_in_file.__name__ + " is called")

    try :
        with open(filePath, "w") as file:
            try:
                json.dump(data, file, indent=1)
                print("Function " + saving_in_file.__name__ + " : The data has been saved successfully")
                return {
                    "status" : 200,
                    "message" : i18n.t("t_saving_in_file_success_message")
                }
            except:
                print("Function " + saving_in_file.__name__ + " : The data is not correct, check the data")
                return {
                    "status" : 404,
                    "message" : i18n.t("t_saving_in_file_notfound_message")
                }
    except :
        print("Function " + saving_in_file.__name__ + " : Error opening the database file")

        return {
            "status" : 500,
            "message" : i18n.t("t_saving_in_file_dataerror_message")
        }
        
def loading_file(filePath): 
    """
        Read the json data in the file
    """
    print("Function " + loading_file.__name__ + " is called")

    try :
        with open(filePath) as file:
            try:
                data=json.load(file)
                if len(data)==0:
                    data=[]
            except:
                data=[]
        print("Function " + loading_file.__name__ + " : The datas have been loaded successfully")

        return {
                "status" : 200,
                "message" : i18n.t("t_loading_file_success_message"), 
                "data" : data
        }
    except :
        print("Function " + loading_file.__name__ + " : Error opening the database file")

        return {
            "status" : 500,
            "message" : i18n.t("t_loading_file_dataerror_message")
        }

def add_person(filePath, person):
    """
        This function permits to add the person in database. 
    """
    print("Function " + add_person.__name__ + " is called")

    response=loading_file(filePath)
    if response["status"]==200:
        print("Function " + add_person.__name__ + " : The database has been loaded")

        data=response["data"]
        
        #Verify person body
        if person.__contains__("firstName"):
            person["firstName"]=get_word_capitalize(person["firstName"])
        else:
            print("Function " + add_person.__name__ + " : Error, the firstName is required")
            return {
                "status" : 400,
                "message": "t_add_person_firstname_required_message"
            }

        if person.__contains__("lastName"):
            person["lastName"]=get_word_capitalize(person["lastName"])
        else:
            print("Function " + add_person.__name__ + " : Error, the lastName is required")
            return {
                "status" : 400,
                "message" : "t_add_person_lastname_required_message"
            }
        
        if not person.__contains__("age"):
            print("Function " + add_person.__name__ + " : Error, the age is required")
            return {
                "status" : 400,
                "message" : "t_add_person_age_required_message"
            }
        
        if not person.__contains__("sex"):
            print("Function " + add_person.__name__ + " : Error, the sex is required")
            return {
                "status" : 400,
                "message" : "t_add_person_sex_required_message"
            }
        
        if not person.__contains__("languages"):
            print("Function " + add_person.__name__ + " : Error, the languages is required")
            return {
                "status" : 400,
                "message" : "t_add_person_language_required_message"
            }

        data.append(person) 
        savingResponse=saving_in_file(filePath, data)
        if savingResponse["status"]==200 :
            print("Function " + add_person.__name__ + " : The person {} has been added successfully".format(person))

            return {
                "status" : 201,
                "message" : "t_add_person_success_message"
            }
        else :
            print("Function " + add_person.__name__ + " : The person has not saved, not writing in the database")

            return {
                "status":500,
                "message" : "t_add_person_notsave_message"
            }
    else:
        print("Function " + add_person.__name__ + " : The person has not saved not loading of database")

        return{
            "status" : 500,
            "message" : "t_add_person_notloadingdatabase_message"
        }
    
def delete_person(filePath, person):
    """
        This function permits to delete the specific person.
    """
    print("Function " + delete_person.__name__ + " is called")

    response=loading_file(filePath)
    if response["status"]==200:
        print("Function " + delete_person.__name__ + " : The data are been loaded")

        data=response["data"]
        deletedList=[] #=> Contains the list of persons who must be deleted
        deletedBody={} #=> Contains the feature of the person who must be deleted

        if person.__contains__("firstName"):
            # Select the person with the first name is sepcified
            deletedFirstName=get_word_capitalize(person["firstName"])
            deletedBody["firstName"]=deletedFirstName
            deletedList=[element for element in data if element["firstName"]==deletedFirstName]
        
        if person.__contains__("lastName"):
            # Select the person with the last name is specified
            deletedLastName=get_word_capitalize(person["lastName"])
            deletedBody["lastName"]=deletedLastName
            if deletedList:
                deletedList=[element for element in deletedList if element["lastName"]==deletedLastName]
            else:
                deletedList=[element for element in data if element["lastName"]==deletedLastName]
        
        if person.__contains__("age"):
            # Select the person with the age is specified
            deletedAge=person["age"]
            deletedBody["age"]=deletedAge
            if deletedList:
                deletedList=[element for element in deletedList if element["age"]==deletedAge]
            else:
                deletedList=[element for element in data if element["age"]==deletedAge]
        
        if person.__contains__("sex"):
            # Select the person with the sex is specified
            deletedSex=person["sex"]
            deletedBody["sex"]=deletedSex
            if deletedList:
                deletedList=[element for element in deletedList if element["sex"]==deletedSex]
            else:
                deletedList=[element for element in data if element["sex"]==deletedSex]
        
        if person.__contains__("languages"):
            # Selected the person with the languages are given
            deletedLanguages=person["languages"]
            deletedBody["languages"]=deletedLanguages
            if deletedList:
                deletedList=[element for element in deletedList if element["languages"]==deletedLanguages]
            else:
                deletedList=[element for element in data if element["languages"]==deletedLanguages]
        
        # Delete the persons which is present in the deletedList
        if(deletedList):
            print("Function " + delete_person.__name__ + " : Deleting of person(s) with feature(s) is(are) {0}".format(deletedList))
            for element in deletedList:
                data.remove(element)
            response=saving_in_file(filePath, data)
            if response["status"]==200:
                print("Function " + delete_person.__name__ + " : Deletion {0} of person(s) with feature(s) is(are) {1}".format(len(deletedList), deletedBody))
                return {
                    "status" : 200,
                    "message" : "t_delete_person_success_message",
                    "count" : len(deletedList),
                    "body" : deletedBody
                }
            else:
                print("Function " + delete_person.__name__ + " : No deleting, file not found, check json")
                return {
                    "status" : 500,
                    "message": "t_delete_person_notfile_message"
                }
        else:
            print("Function " + delete_person.__name__ + " : No deleting, not body found")
            return {
                "status" : 404,
                "message" : "t_delete_person_notbody_message",
                "body" : deletedBody
            }

def delete_all(filePath):
    """
        This function permits to delete all persons.
    """
    print("Function " + delete_all.__name__ + " is called")
    response=loading_file(filePath)
    if response["status"]==200:
        print("Function " + delete_all.__name__ +" : The data are been loaded")

        data=response["data"]
        deletedCount=len(data)
        data=[]
        responseSaving=saving_in_file(filePath, data)
        
        if responseSaving["status"]==200:
            print("Function " + delete_all.__name__ + " : Deleting all is successfully")
            return {
                "status" : 200,
                "message" : "t_delete_all_success_message",
                "count" : deletedCount
            }
        else :
            return {
                "status" : 500,
                "message" : "t_delete_all_errorfile_message"
            }
    else :
        return {
            "status" : 500,
            "message" : "t_delete_all_errorreading_message"
        }

def search_person(filePath, person):
    """
        This function permits to search the specific person.
    """
    print("Function " + search_person.__name__ + " is called")

    response=loading_file(filePath)    
    if response["status"]==200:
        print("Function " + search_person.__name__ + " : The data are loaded")

        data=response["data"]
        searchData=[]
        searchBody={}
        if person.__contains__("firstName"):
            firstName=get_word_capitalize(person["firstName"])
            searchBody["firstName"]=firstName
            searchData=[element for element in data if element["firstName"]==firstName]
        
        if person.__contains__("lastName"):
            lastName=get_word_capitalize(person["lastName"])
            searchBody["lastName"]=lastName
            if searchData:
                searchData=[element for element in searchData if element["lastName"]==lastName]
            else:
                searchData=[element for element in data if element["lastName"]==lastName]
        
        if person.__contains__("age"):
            age=person["age"]
            searchBody["age"]=age
            if searchData:
                searchData=[element for element in searchData if element["age"]==age]
            else:
                searchData=[element for element in data if element["age"]==age]
        
        if person.__contains__("sex"):
            sex=person["sex"]
            searchBody["sex"]=sex
            if searchData:
                searchData=[element for element in searchData if element["sex"]==sex]
            else:
                searchData=[element for element in data if element["sex"]==sex]
        
        if person.__contains__("languages"):
            languages=person["languages"]
            searchBody["languages"]=languages
            if searchData:
                searchData=[element for element in searchData if element["languages"]==languages]
            else:
                searchData=[element for element in data if element["languages"]==languages]
        print("Function " + search_person.__name__ + " : {0} person(s) with feature(s) {1} is (are) found!".format(len(searchData), searchBody))
        
        if searchBody:
            return {
                "status" : 200,
                "message" : "{0}".format(len(searchData)) + " " + i18n.t("t_search_person_success_message"),
                "data" : searchData,
                "count" : len(searchData),
                "body" : searchBody
            }
        else:
            return {
                "status" : 404,
                "message" : i18n.t("t_search_person_notbody_message"),
                "body" : searchBody
            }
    else:
        print("Function " + search_person.__name__ + " : Database not loaded")
        return {
            "status" : 500,
            "message" : i18n.t("t_search_person_error_message")
        }

def show_all(filePath):
    """
        This function permits to fetch all persons in database.
    """
    print("Function " + show_all.__name__ + " is called")

    response=loading_file(filePath)
    if response["status"]==200:
        print("Function " + show_all.__name__ + " : The data has been loaded")
        data=response["data"]
        
        if data:
            return {
                "status" : 200,
                "message" : "t_show_all_success_message",
                "count" : len(data),
                "data" : data
            }
        else:
            return {
                "status" : 404,
                "message" : "t_show_all_empty_message" 
            }
    else:
        return {
            "status" : 500,
            "message" : "t_show_all_error_message"
        }

"""
    UTILITY FUNCTION
"""
def get_word_capitalize(word):
    """
        Return the string which is the join of list element in capitalize.
    """
    print("Function " + get_word_capitalize.__name__ + " is called")

    words=word.split()
    for i in range(len(words)):
        words[i]=words[i].lower().capitalize()
    return " ".join(words)

