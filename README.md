# Edacy Simple CRUD Auth App

Ce projet est une application de gestion d'événements avec authentification, développée avec Angular pour le frontend et Spring Boot pour le backend.  
Il permet la création, la modification, la suppression et l'affichage des événements, avec un système d'authentification basé sur JWT.

---

## 🛠 Prérequis

Assurez-vous d’avoir les outils suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) — version **22.15.0** recommandée
- [Java](https://www.oracle.com/java/technologies/javase-downloads.html) — **Java 17** ou plus récent
- [Maven](https://maven.apache.org/) — pour la compilation du backend
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) — pour exécuter la base de données

---

## 📦 Installation du projet

### 1. Cloner le dépôt

```bash
git clone https://github.com/saliou-tech/edacy-simple-crud-auth-app.git
```


---

## 🎨 Lancer le Frontend (Angular)

```bash
cd edacyEventFront
npm install
ng serve
```

Par défaut, l’application sera disponible sur :  
👉 `http://localhost:4200`

---

## ⚙️ Lancer le Backend (Spring Boot)

```bash
cd edacyEvent
```

### 1. Démarrer la base de données avec Docker

```bash
cd configuration
docker-compose up -d
```

Cela démarre une base de données MYSQL définie dans le fichier `docker-compose.yml`.

### 2. Compiler et exécuter l'application Spring Boot

```bash
cd ..
mvn clean install
mvn spring-boot:run
```

Le backend sera disponible sur :  
👉 `http://localhost:8080`

---

## ✅ Lancement rapide (résumé)

```bash
# Cloner le dépôt
git clone https://github.com/saliou-tech/edacy-simple-crud-auth-app.git

# Lancer le frontend
cd edacyEventFront
npm install
ng serve

# Lancer le backend
cd ../edacyEvent/configuration
docker-compose up -d
cd ..
mvn clean install
mvn spring-boot:run
```

---

## 🧪 Tests

Pour exécuter les tests unitaires du backend :

```bash
mvn test
```

---

## 📚 Technologies utilisées

* **Frontend** : Angular
* **Backend** : Spring Boot
* **Base de données** : MYSQL (via Docker)
* **Authentification** : JSON Web Token (JWT)
* **Gestion de dépendances** : Maven, npm

---

## 👨‍💻 Auteur

Projet réalisé dans le cadre de depot candidature  formation **Edacy**.

---


