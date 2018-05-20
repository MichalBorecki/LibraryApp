<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="pl">
<head>

<%@ include file="WEB-INF/header.jspf"%>

</head>
<body>

	<%@ include file="WEB-INF/navbar.jspf"%>

	<div class="container container-field">
		<p class="header-field roll">Znajdź książkę po ID</p>
		<form class="hidden-form" id="form-search" method="GET">
			<fieldset><!-- use fieldset here because it hands correct grey background color in bootstrap -->
				<div class="form-row">
					<div class="form-group col-md-6">
						<input class="form-control" type="number" id="id" name="id" placeholder="wpisz ID">
					</div>
					<div class="form-group col-md-12">
						<button class="btn btn-primary" type="submit">Wyszukaj książkę</button>
					</div>
				</div>
			</fieldset>
		</form>
	</div>

	<div class="container container-field">
		<p class="header-field roll">Dodaj książkę do zbioru</p>
		<form class="hidden-form" id="form-add" method="POST">
			<fieldset><!-- use fieldset here because it hands correct grey background color in bootstrap -->
				<div class="form-row">
					<div class="form-group col-md-6">
						<label for="id">ID:</label> <input class="form-control" type="number" id="id" name="id">
					</div>
					<div class="form-group col-md-6">
						<label for="title">Tytuł:</label> <input class="form-control" type="text" id="title" name="title">
					</div>
					<div class="form-group col-md-6">
						<label for="author">Autor:</label> <input class="form-control" type="text" id="author" name="author">
					</div>
					<div class="form-group col-md-6">
						<label for="publisher">Wydawnictwo:</label> <input class="form-control" type="text" id="publisher"
							name="publisher">
					</div>
					<div class="form-group col-md-6">
						<label for="type">Typ:</label> <input class="form-control" type="text" id="type" name="type">
					</div>
					<div class="form-group col-md-6">
						<label for="isbn">ISBN:</label> <input class="form-control" type="text" id="isbn" name="isbn">
					</div>
					<div class="form-group col-md-12">
						<button class="btn btn-primary" type="submit">Dodaj książkę</button>
					</div>
				</div>
			</fieldset>
		</form>
	</div>

	<div class="container">
		<p class="header-field">Lista książek</p>
		<!-- <div id="main"></div> -->
		<ol class="ol-list-books" id="books"></ol>
	</div>

	<%@ include file="WEB-INF/footer.jspf"%>

</body>

</html>