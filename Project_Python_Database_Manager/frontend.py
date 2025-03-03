"""
    Créer une application graphique en Python qui:
    -Affiche un formulaire d'enregistrement : Nom, Prénoms, Age, Langues (checkbox), sexe (radio).
    -Un bouton ajouter pour ajouter la personne à la liste des inscrits si elle est déjà existante afficher un message d'erreur sinon afficher un message de succès.
    -Un bouton supprimer pour effacer la personne dont on a entré les informations afficher une erreur si aucun résultat.
    -Un bouton annuler pour vider tous les champs texte.
    -Un bouton fermer pour quitter l'application.
    En dessous afficher un récapitulatif de l'ensemble des inscrits dans la base toute la liste avec l'ensemble de leurs attributs.
    L’enregistrement doit se faire dans un fichier de telle sorte qu'à l'ouverture de l'application,
    L'utilisateur doit avoir la possibilité de fournir le fichier de base grâce à un champ de sélection de fichier en entête de l'application.
    Author : The World Wolf 95
"""
from tkinter import *
from tkinter.filedialog import *
from tkinter import ttk
import tkinter.font as tkFont

# Translation Package
import i18n
import translations

def init(lang="fr"):
    """
        It is the initialisation of window
    """
    i18n.set("locale", lang)

    """
        Define the global window
    """
    fen=Tk()
    icon = PhotoImage(file="Images/image.png") #=> Define application icon
    fen.iconphoto(False, icon)

    """
        Define the link of variables on the form widgets.
    """    
    firstName=StringVar()       #=> The link of the form first name
    lastName=StringVar()        #=> The link of the form last name
    age=StringVar()             #=> The link of the form age
    sex=IntVar()                #=> The link of the form sex 
    frLanguage=IntVar()         #=> The link of the form checkbox French option
    enLanguage=IntVar()         #=> The link of the form checkbox English option
    chLanguage=IntVar()         #=> The link of the form checkbox Chinese option
    filePath=StringVar()        #=> The database path
    statusMessage=StringVar()   #=> The status message variable
    displayLang=IntVar()        #=> The application display language

    """
        DEFINITION OF DIFFERENTS OBJECTS OF APPLICATION
    """                                                         
    fileFrame=LabelFrame()                                              #=> It is file choice frame
    displayLangFrame=LabelFrame(fen)                                    #=> It is language choice frame
    formFrame=LabelFrame(fen)                                           #=> It is the form frame
    fenTitle=Label(fen)                                                 #=> It is the title of the main window
    chxFile=""                                                          #=> Contains the database name
    lbFile=Label(fileFrame, textvariable=filePath)                      #=> Contains the database location 
    btCreateFile=Button(fileFrame)                                      #=> Permit to create a new database
    btSelectFile=Button(fileFrame)                                      #=> Permit to select the existing database
    btQuit=Button(fen)                                                  #=> Button for end the application
    #Widgets of form
    lbFirstName=Label(formFrame)                                        #=> It is the label of first name input
    txtFisrtName=Entry(formFrame, textvariable=firstName)               #=> It is the first name entry
    lbLastName=Label(formFrame)                                         #=> It is the label of last name input
    txtLastName=Entry(formFrame, textvariable=lastName)                 #=> It is the last name entry
    lbAge=Label(formFrame)                                              #=> It is the label of age input
    txtAge=Entry(formFrame, textvariable=age)                           #=> It is the age entry
    lbSex=Label(formFrame)                                              #=> It is the label of sex selection
    sexFrame=Frame(formFrame)                                           #=> It is the container of sex radio box
    chxSexM=Radiobutton(sexFrame, variable=sex, value=1)                #=> It is the selection of user sex male
    chxSexF=Radiobutton(sexFrame, variable=sex, value=2)                #=> It is the selection of user sex female
    lbLanguages=Label(formFrame)                                        #=> It is the label of languages selection
    chxLanguageFrame=Frame(formFrame)                                   #=> It is the languages checkbox frame
    chxFrench=Checkbutton(chxLanguageFrame, variable=frLanguage)        #=> It is the checkbox of language French
    chxEnglish=Checkbutton(chxLanguageFrame, variable=enLanguage)       #=> It is the checkbox of language English
    chxChinese=Checkbutton(chxLanguageFrame, variable=chLanguage)       #=> It is the checkbox of language Chinese
    lbCountry=Label(formFrame)                                          #=> It is user country combobox
    chxCountry=ttk.Combobox(formFrame)                                  #=> It the user country choice
    #Widgets of button
    btFrame=LabelFrame(fen)                                             #=> It is the different buttons container
    btAdd=Button(btFrame)                                               #=> Add a new person in  database
    btDelete=Button(btFrame)                                            #=> Delete the person in the database
    btResearch=Button(btFrame)                                          #=> Search in the database
    btShowAll=Button(btFrame)                                           #=> Show all persons in database
    btDeleteAll=Button(btFrame)                                         #=> Delete all persons in database
    btReset=Button(btFrame)                                             #=> Reset the input elements in the form
    btQuit=Button(btFrame)                                              #=> The button when you want to quit

    """
        DEFINE GLOBALS PROPERTIES
    """
    sepX=10
    sepY=10
    txtWidth=50
    txtHeigth=50
    lbWidth=100
    lbHeigth=10
    frameSepX=10
    frameSepY=10
    lbFont=tkFont.Font(family='Helvetica', size=15, weight='bold')
    txtFont=lbFont=tkFont.Font(family='Verdana', size=15)
    bgColor="#827775"

    """
        CONFIGURATION OF DIFFERENTS WIDGETS
    """
    #Main window
    fen.configure(bg=bgColor)
    fen.title(i18n.t("t_application_title"))
    try:
        fen.iconbitmap("Images/logo.ico")
        photo=PhotoImage(file="Images/image.png")
        photoContainer=Canvas(fen,width=224,height=225)
        photoContainer.create_image(120,100,image=photo)
        photoContainer.configure(bg=bgColor)
    except:
        print(i18n.t("t_folder_image_not_found"))

    #Window title
    fenTitle.configure(text=i18n.t("t_windows_title"))
    fenTitle.configure(anchor="center")
    fenTitle.configure(justify="center")
    fenTitle.configure(borderwidth=4)
    fenTitle.configure(relief="groove")
    fenTitle.configure(font=tkFont.Font(family='Helvetica', size=36, weight='bold'))
    fenTitle.configure(bg="#e0cda9")

    #Configure display language choice widgets
    displayLangFrame.configure(text=i18n.t("t_display_language_frame_title"),bg=bgColor,padx=sepX,pady=sepY)
    langFrame=Frame(displayLangFrame)                                                                           #=> It is the container of display language
    chxFr=Radiobutton(langFrame, variable=displayLang, value=1)                                                 #=> It is choice of the language french
    chxEn=Radiobutton(langFrame, variable=displayLang, value=2)                                                 #=> It is choice of the language english
    chxFr.grid(row=0,column=0)                                                                                  #=> Position in langFrame
    chxEn.grid(row=0,column=1)                                                                                  #=> Position in langFrame
    chxFr.configure(text=i18n.t("t_form_language_french"), font=txtFont, bg=bgColor, value=1)
    chxEn.configure(text=i18n.t("t_form_language_english"), font=txtFont, bg=bgColor, value=2)
    langFrame.pack()
    # Set language
    if lang=="fr":
        displayLang.set(1)
    else:
        displayLang.set(2)                                                                                         

    #Configure file chosen widgets and add in frame
    fileFrame.configure(text=i18n.t("t_file_frame_title"),bg=bgColor,padx=sepX,pady=sepY)
    lbFile.configure(width=lbWidth, anchor=W, justify="right")
    btCreateFile.configure(text=i18n.t("t_bt_create_file"), font=lbFont)
    btSelectFile.configure(text=i18n.t("t_bt_select_file"), font=lbFont)
    Label(fileFrame,text="Path : ", font=lbFont, bg=bgColor).pack(side=LEFT)
    lbFile.pack(side=LEFT, padx=sepX, pady=sepY)
    btCreateFile.pack(side=RIGHT, padx=sepY)
    btSelectFile.pack(side=RIGHT)

    #Configure form widgets and add it
    formFrame.configure(text=i18n.t("t_form_frame_title"), bg=bgColor, padx=frameSepX, pady=frameSepY)
    lbFirstName.configure(text=i18n.t("t_form_first_name"), font=lbFont, bg=bgColor, pady=sepY)
    txtFisrtName.configure(width=txtWidth,font=txtFont)
    lbLastName.configure(text=i18n.t("t_form_last_name"), font=lbFont, bg=bgColor, pady=sepY)
    txtLastName.configure(width=txtWidth,font=txtFont)
    lbAge.configure(text=i18n.t("t_form_age"), font=lbFont, bg=bgColor, pady=sepY)
    txtAge.configure(width=txtWidth,font=txtFont)
    lbSex.configure(text=i18n.t("t_form_sex"), font=lbFont, bg=bgColor, pady=sepY)
    chxSexM.configure(text=i18n.t("t_form_sex_male"), font=txtFont, bg=bgColor, value=1)
    chxSexF.configure(text=i18n.t("t_form_sex_female"), font=txtFont, bg=bgColor, value=2)
    lbLanguages.configure(text=i18n.t("t_form_languages"), font=lbFont, bg=bgColor, pady=sepY)
    chxFrench.configure(text=i18n.t("t_form_language_french"), font=txtFont, bg=bgColor)
    chxEnglish.configure(text=i18n.t("t_form_language_english"), font=txtFont, bg=bgColor)
    chxChinese.configure(text=i18n.t("t_form_language_chinese"), font=txtFont, bg=bgColor)
    lbFirstName.grid(row=1,column=0)
    txtFisrtName.grid(row=1,column=1)
    lbLastName.grid(row=2,column=0)
    txtLastName.grid(row=2,column=1)
    lbAge.grid(row=3,column=0)
    txtAge.grid(row=3,column=1)
    lbSex.grid(row=4,column=0)
    chxSexM.grid(row=0,column=1) #=> Position in sexFrame
    chxSexF.grid(row=0,column=2) #=> Position in sexFrame
    sexFrame.grid(row=4,column=1) 
    chxFrench.grid(row=0, column=1) #=> Position in chxLanguageFrame
    chxEnglish.grid(row=0, column=2) #=> Position in chxLanguageFrame
    chxChinese.grid(row=0, column=3) #=> Position in chxLanguageFrame
    lbLanguages.grid(row=5, column=0) #=>Position in the formFrame
    chxLanguageFrame.grid(row=5, column=1) #=>Position in the formFrame

    #Configuration of buttons
    btFrame.configure(text=i18n.t("t_button_frame_title"), bg=bgColor, padx=frameSepX, pady=frameSepY)
    btAdd.configure(text=i18n.t("t_bt_add"), font=lbFont, state=DISABLED)
    btDelete.configure(text=i18n.t("t_bt_delete"), font=lbFont, state=DISABLED)
    btResearch.configure(text=i18n.t("t_bt_research"), font=lbFont, state=DISABLED)
    btShowAll.configure(text=i18n.t("t_bt_show_all"), font=lbFont, state=DISABLED)
    btDeleteAll.configure(text=i18n.t("t_bt_delete_all"), font=lbFont, state=DISABLED)
    btReset.configure(text=i18n.t("t_bt_reset"), font=lbFont, state=DISABLED)
    btQuit.configure(text=i18n.t("t_bt_quit"), font=lbFont)
    btAdd.grid(row=0, column=1, padx=sepX)
    btDelete.grid(row=0, column=2, padx=sepX)
    btResearch.grid(row=0, column=3, padx=sepX)
    btShowAll.grid(row=0, column=4, padx=sepX)
    btDeleteAll.grid(row=0, column=5, padx=sepX)
    btReset.grid(row=0, column=6, padx=sepX)
    btQuit.grid(row=0, column=7, padx=sepX)

    """
        CONFIGURATION OF FOOTER
    """
    statusMessage.set(i18n.t("t_status_ready"))
    status=Label(fen, borderwidth=1, background=bgColor, font=tkFont.Font(family='Helvetica', size=14, weight='bold'), textvariable=statusMessage) #=> The status message of window

    """
        ADD DIFFERENTS WIDGETS ON MAIN WINDOW
    """
    fenTitle.pack()
    photoContainer.pack()
    displayLangFrame.pack()
    fileFrame.pack(pady=frameSepY)
    formFrame.pack()
    btFrame.pack()
    status.pack(side=BOTTOM)

    """
        DEFINITION OF TABLE WINDOW
    """
    fenTable=Tk()                             #=> It is table frame windows
    #Table windows widgets
    tabTitle=Label(fenTable)                  #=> It is the title of table
    table=ttk.Treeview(fenTable, columns=("firstName", "lastName", "age", "sex", "languages"))
    btQuitTable=Button(fenTable, text=i18n.t("t_bt_table"), font=txtFont)

    # Definition of table headers
    table.heading("firstName", text=i18n.t("t_table_first_name"))
    table.heading("lastName", text=i18n.t("t_table_last_name"))   
    table.heading("age", text=i18n.t("t_table_age")) 
    table.heading("sex", text=i18n.t("t_table_sex"))
    table.heading("languages", text=i18n.t("t_table_languages"))
    table ['show']='headings' #=> For deleting the left first column

    #Base configuration of table windows
    fenTable.title(i18n.t("t_table_window_title"))

    #Base configuration of table title
    tableTitleFont=tkFont.Font(family='Helvetica', size=50, weight='bold')
    tabTitle.configure(text=i18n.t("t_table_default_title"), font=tableTitleFont, anchor="center", justify="center", borderwidth=4, relief="groove", padx=frameSepX, pady=frameSepY)
    #Add element
    tabTitle.pack(pady=20)
    table.pack()
    btQuitTable.pack(pady=20)


    """
        Creation of globals functions
    """
    def is_file_presents():
        """
            Verify if a file which path given exists.
        """
        import os.path
        if os.path.isfile(filePath.get()):
            return True
        else:
            from tkinter import messagebox
            messagebox.showerror(i18n.t("t_error_file_title"), i18n.t("t_error_file"))
            btAdd["state"]=DISABLED
            btResearch["state"]=DISABLED
            btShowAll["state"]=DISABLED
            btDeleteAll["state"]=DISABLED
            btDelete["state"]=DISABLED
            btReset["state"]=DISABLED
            filePath.set("")
            return False

    def get_form():
        """
            Obtain the contains of form widgets.
        """
        params={}

        if firstName.get()!="" and not firstName.get().isspace():
            params["firstName"]=firstName.get()
        
        if lastName.get()!="" and not lastName.get().isspace():
            params["lastName"]=lastName.get()
        
        if age.get()!="" and not age.get().isspace():
            params["age"]=age.get()
        
        if sex.get()==1:
            params["sex"]="Male"
        elif sex.get()==2:
            params["sex"]="Female"
        else:
            pass

        params["languages"]=[]
        if frLanguage.get()!=0 or enLanguage.get()!=0 or chLanguage.get()!=0:
            if frLanguage.get()==1:
                params['languages'].append("French")
            if enLanguage.get()==1:
                params['languages'].append("English")
            if chLanguage.get()==1:
                params['languages'].append("Chinese")
        else:
            params["languages"].append("Others")

        return params

    def delete_items_in_table():
        """
            This function deletes the items in the table.
        """
        for element in table.get_children():
            table.delete(element)

    def display_in_table(title, persons):
        """
            Diplay the content of the data in window table with the title 
        """
        delete_items_in_table()
        tabTitle["text"]=title 
        for person in persons:
            table.insert('', "end", values=(person["firstName"], person["lastName"], person["age"], person["sex"], person["languages"]))
        fenTable.deiconify()
        fen.withdraw()

    def is_correct_firstName():
        """
            Verify if the value of first name in the form is correct the count of letters must be greater than 2 characters. 
        """
        from tkinter import messagebox
        if len(firstName.get())<2:
            messagebox.showwarning(i18n.t("t_warning_length_first_name_title"), i18n.t("t_warning_length_first_name_message"))
            return False
        else:
            try:
                nb=int(firstName.get())
                messagebox.showwarning(i18n.t("t_warning_type_first_name_title"), i18n.t("t_warning_type_first_name_message"))
                return False
            except:
                return True

    def is_correct_lastName():
        """
            Verify if the value of last name in the form is correct the count of letters must be greater than 2 characters. 
        """
        from tkinter import messagebox
        if len(lastName.get())<2:
            messagebox.showwarning(i18n.t("t_warning_length_last_name_title"), i18n.t("t_warning_length_last_name_message"))
            return False
        else:
            try:
                nb=int(lastName.get())
                messagebox.showwarning(i18n.t("t_warning_type_last_name_title"), i18n.t("t_warning_type_last_name_message"))
                return False
            except:
                return True

    def is_correct_age():
        """
            Verify if the value of age in the form is correct the count of letters must be a integer greater than 0 and less than 100 years. 
        """ 
        from tkinter import messagebox
        try:
            ageInNumber=int(age.get())
            if ageInNumber<0 or ageInNumber>100: 
                messagebox.showwarning(i18n.t("t_warning_value_age_title"), i18n.t("t_warning_value_age_message"))
                return False
            else:
                return True
        except:
            messagebox.showwarning(i18n.t("t_warning_type_age_title"), i18n.t("t_warning_type_age_message"))

    def is_select_sex():
        """
            Verify if a radio one option of sex radios is selected.
        """       
        return ( sex.get()==1 or sex.get()==2 )

    def is_json(path):
        """
            Verify if a path which is given is the json file and return true or false.
        """
        import os
        from os.path import basename
        pathBase=basename(path)
        fileName, fileExtension=os.path.splitext(pathBase)
        return fileExtension==".json"

    def get_format(body):
        """
            Return the dictionary in good format.
        """
        person=""
        if body.__contains__("firstName"):
            person = person + i18n.t("t_form_first_name") + body["firstName"] + "\n"
        if body.__contains__("lastName"):
            person = person + i18n.t("t_form_last_name") + body["lastName"] + "\n"
        if body.__contains__("sex"):
            if body["sex"]=="Male":
                person = person + i18n.t("t_form_sex") + i18n.t("t_form_sex_male") + "\n"
            else:
                person = person + i18n.t("t_form_sex") + i18n.t("t_form_sex_female")
        if body.__contains__("age"):
            person = person + i18n.t("t_form_age") + body["age"] + "\n"
        if body.__contains__("languages"):
            langs = ""
            for language in body["languages"]:
                if language == "French":
                    language = i18n.t("t_form_language_french")
                elif language == "English":
                    language = i18n.t("t_form_language_english")
                elif language == "Chinese":
                    language = i18n.t("t_form_language_chinese")
                else:
                    language = i18n.t("t_others_languages") 
                langs += language + ", "
            person = person + i18n.t("t_form_languages") + langs
        return person

    def change_display_language():
        """
            Change the displaying language
        """
        if displayLang.get() == 1:
            fenTable.destroy()
            fen.destroy()
            init("fr")
        else:
           fenTable.destroy()
           fen.destroy()
           init("en")

    """
        DEFINITION OF BUTTONS ACTIONS
    """
    def click_bt_select():
        """
            Define what happen when you click on select database button.
        """
        from tkinter import filedialog
        path=filedialog.askopenfilename(title=i18n.t("t_select_file_dialog_title"), filetypes=[('json files', '*.json')])
        if(path):
            if(is_json(path)):
                filePath.set(path)
                # Active actions buttons
                btAdd["state"]=NORMAL
                btResearch["state"]=NORMAL
                btDelete["state"]=NORMAL
                btShowAll["state"]=NORMAL
                btDeleteAll["state"]=NORMAL
                btReset["state"]=NORMAL
            else:
                from tkinter import messagebox
                messagebox.showwarning(i18n.t("t_warning_select_file_title"), i18n.t("t_warning_select_file_message"))

    def click_bt_create():
        """
            Define what happen when you click on create database button
        """
        from tkinter import filedialog
        file=filedialog.asksaveasfile(title=i18n.t("t_create_file_dialog_title"), filetypes=[("json files", "*.json")])
        if(file):
            path=file.name
            file.close()
            if is_json(path):
                filePath.set(path)
                statusMessage.set(i18n.t("t_status_empty_file"))
                # Active actions buttons
                btAdd["state"]=NORMAL
                btResearch["state"]=NORMAL
                btShowAll["state"]=NORMAL
                btDelete["state"]=NORMAL
                btDeleteAll["state"]=NORMAL
                btReset["state"]=NORMAL
            else:
                from tkinter import messagebox
                messagebox.showerror(i18n.t("t_warning_create_file_title"), i18n.t("t_warning_create_file_message"))
                import os
                os.remove(path)

    def click_bt_add():
        """
            Define what happen when you click on add button.
        """
        if is_correct_firstName() and is_correct_lastName() and is_correct_age() and is_select_sex():
            if is_file_presents():
                from backend import add_person
                response=add_person(filePath.get(), get_form())
                from tkinter import messagebox
                if response["status"]==201:
                    messagebox.showinfo(i18n.t("t_message_successfuly_add_title"), i18n.t(response["message"]))
                    statusMessage.set(i18n.t("t_status_add_successfully"))
                    click_bt_reset()
                else:
                    messagebox.showerror(i18n.t("t_message_error_add_title"), i18n.t(response["message"]))
                    statusMessage.set(i18n.t("t_status_add_error"))
        else :
            from tkinter import messagebox
            messagebox.showerror(i18n.t("t_message_error_form_add_title"), i18n.t("t_message_error_form_add_message"))
        statusMessage.set(i18n.t("t_status_ready"))

    def click_bt_delete():
        """
            Define what happen when you click on delete button.
        """
        if is_file_presents():
            from backend import delete_person
            response=delete_person(filePath.get(), get_form())
            from tkinter import messagebox
            if response["status"]==200:
                if response["count"]==1:
                    messagebox.showinfo(i18n.t("t_message_successfuly_delete_title"), i18n.t("t_message_successfuly_delete_one_message") + "\n{0}".format(get_format(response["body"])))
                else:
                    count = response["count"]
                    messagebox.showinfo(i18n.t("t_message_successfuly_delete_title"), "{0}".format(count) + " " + i18n.t("t_message_successfuly_delete_many_message") + "\n{0}".format(get_format(response["body"])))
                statusMessage.set(i18n.t("t_status_delete_success"))
                click_bt_reset()
            elif response["status"]==404:
                messagebox.showwarning(i18n.t("t_delete_message_title"), i18n.t("t_delete_warning_message") + "\n{0}".format(get_format(response["body"])))
                statusMessage.set("No deleting !")
            else:
                messagebox.showerror(i18n.t("t_delete_message_title"), i18n.t(response["message"]))
                statusMessage.set(i18n.t("t_status_error_deleting"))
            statusMessage.set(i18n.t("t_status_ready"))
            
    def click_bt_research():
        """
            Define what happen when you click on research button.
        """
        if is_file_presents():
            from backend import search_person
            response = search_person(filePath.get(), get_form())
            from tkinter import messagebox
            if response["status"]==200:
                messagebox.showinfo(i18n.t("t_search_person_message_title"), "{0}".format(response["count"]) + " " + i18n.t("t_search_person_message_info") + "\n{0}".format(get_format(response["body"])))
                if(response["count"]>0):
                    display_in_table(i18n.t("t_search_person_table_title"), response["data"])
            elif response["status"]==404:
                messagebox.showinfo(i18n.t("t_search_person_message_title"), i18n.t("t_search_person_message_nobody") + "\n{0}".format(get_format(response["body"])))
            else:
                messagebox.showerror(i18n.t("t_search_person_message_title"), i18n.t(response["message"]))
  
    def click_bt_show_all():
        """
            Define what happen when you click on show all button.
        """
        if is_file_presents():
            from backend import show_all
            click_bt_reset()
            response = show_all(filePath.get())
            from tkinter import messagebox
            if response["status"]==200:
                messagebox.showinfo(i18n.t("t_show_all_message_title"), i18n.t(response["message"], count=response["count"]))
                display_in_table(i18n.t("t_show_all_table_title"), response["data"])
            elif response["status"]==404:
                messagebox.showinfo(i18n.t("t_show_all_message_title"), i18n.t(response["message"]))
            else:
                messagebox.showerror(i18n.t("t_show_all_message_title"), i18n.t(response["message"]))

    def click_bt_delete_all():
        """
            Define what happen when you click on delete all button.
        """                
        from tkinter import messagebox
        userResponse=messagebox.askyesno(i18n.t("t_delete_all_message_title"), i18n.t("t_delete_all_message_info"))
        if userResponse:
            from backend import delete_all
            if is_file_presents():
                response = delete_all(filePath.get())
                from tkinter import messagebox
                if response["status"]==200:
                    messagebox.showinfo(i18n.t("t_delete_all_message_info_error_title"), i18n.t(response["message"]))
                else :
                    messagebox.showerror(i18n.t("t_delete_all_message_info_error_title"), i18n.t(response["message"]))

    def click_bt_reset():
        """
            Define what happen when you click on reset button.
        """
        firstName.set("")
        lastName.set("")
        age.set("")        
        frLanguage.set(0)      
        enLanguage.set(0)     
        chLanguage.set(0)
        sex.set(0)
        
    def click_bt_quit():
        """
            Define what happen when you click on quit button.
        """
        from tkinter import messagebox
        userResponse=messagebox.askyesno(i18n.t("t_quit_application_message_title"), i18n.t("t_quit_application_message_info"))
        if userResponse:
            fenTable.destroy()
            fen.destroy()

    def click_bt_quit_table():
        """
            Define what happen when you click on quit button on table frame.
        """
        fenTable.withdraw() #=> Hide the fenTable, visible=false
        fen.deiconify() #=> Show the fen with visible=true
        click_bt_reset()

    # Add action on buttons
    btSelectFile.configure(command=click_bt_select)
    btCreateFile.configure(command=click_bt_create)
    btAdd.configure(command=click_bt_add)
    btDelete.configure(command=click_bt_delete)
    btResearch.configure(command=click_bt_research)
    btShowAll.configure(command=click_bt_show_all)
    btDeleteAll.configure(command=click_bt_delete_all)
    btReset.configure(command=click_bt_reset)
    btQuit.configure(command=click_bt_quit)
    btQuitTable.configure(command=click_bt_quit_table)
    chxFr.configure(command=change_display_language)                #=> It is choice of the language french
    chxEn.configure(command=change_display_language) 

    #=> Define the function which is excuted when the user click on close button
    fen.protocol("WM_DELETE_WINDOW", click_bt_quit)
    fenTable.protocol("WM_DELETE_WINDOW", click_bt_quit_table)
    fenTable.withdraw() #=> This line hide the table window. withdraw=hide and deiconify=show 

    """
        RUN APPLICATION
    """
    fen.mainloop()


