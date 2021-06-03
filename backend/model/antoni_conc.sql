-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 03-06-2021 a las 10:19:53
-- Versión del servidor: 10.3.29-MariaDB-0ubuntu0.20.04.1
-- Versión de PHP: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `antoni_conc`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cars`
--

CREATE TABLE `cars` (
  `registration` varchar(7) COLLATE utf8mb4_spanish_ci NOT NULL,
  `brand` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `regdate` date NOT NULL,
  `carcondition` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `upgrades` varchar(200) COLLATE utf8mb4_spanish_ci NOT NULL,
  `category` varchar(120) COLLATE utf8mb4_spanish_ci NOT NULL,
  `price` int(11) NOT NULL,
  `lat` varchar(45) COLLATE utf8mb4_spanish_ci NOT NULL,
  `lon` varchar(45) COLLATE utf8mb4_spanish_ci NOT NULL,
  `views` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `cars`
--

INSERT INTO `cars` (`registration`, `brand`, `model`, `regdate`, `carcondition`, `upgrades`, `category`, `price`, `lat`, `lon`, `views`) VALUES
('0000AAA', 'KIA', 'Tiguan', '2018-10-10', 'Used', 'Wheels:', 'Beniganim,Nou', 9000, '-10.89000', '138.61816', 7),
('0000AAB', 'bmw', 'Serie 1', '2010-10-10', 'New', 'Motor:', 'Valencia', 9000, '76.98908', '21.74515', 5),
('0000AAF', 'KIA', 'Coupe', '2020-10-10', 'New', 'Motor:Wheels:Seats:', 'Promo', 19999, '38.942228', '-0.355878', 4),
('0000ASD', 'BMW', 'asd', '2021-02-09', 'New', 'Motor:', 'ASD', 8034, '41.3828939', '2.1774322', 4),
('0000AXC', 'Volvo', 'Corse', '2020-12-09', 'Old', 'Wheels:', 'Oferta', 2000, '40.416705', '3.703582', 4),
('2484HSU', 'Mercedes-Benz', 'AMG1', '2019-09-20', 'Used', 'Motor:Wheels:', 'Garaje', 30450, '39.469707', '-0.376335', 1),
('2846HDS', 'Volkswagen', 'Polo', '2018-09-13', 'Used', 'Motor:', 'Nou,Barat', 4670, '38.353738', '-0.490185', 7),
('3649CGE', 'SEAT', 'Mondeo', '2021-02-28', 'Old', 'Motor:', 'SEAT', 4947, '', '', 35),
('4788GGD', 'Bugatti', 'Veyron', '2019-04-05', 'New', 'Motor:Wheels:Seats:', 'Premium', 2200000, '39.98333', '-0.03333', 44),
('7993HSF', 'FIAT', '500', '2020-03-07', 'New', 'Motor:Wheels:Seats:', 'Edicion Limitada', 3400, '', '', 0),
('9834UZB', 'FIAT', 'Multipla', '2013-11-23', 'Old', 'Seats:', 'Lleig', 1200, '', '', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `registration` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `cartuser` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `insurance` int(1) NOT NULL,
  `cartprice` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `cart`
--

INSERT INTO `cart` (`registration`, `cartuser`, `insurance`, `cartprice`) VALUES
('3649CGE', 'antonitest', 0, 4947),
('4788GGD', 'us', 1, 2420000);

--
-- Disparadores `cart`
--
DELIMITER $$
CREATE TRIGGER `cart_ai` BEFORE INSERT ON `cart` FOR EACH ROW SET new.cartprice = (SELECT price FROM cars WHERE registration = new.registration)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `cart_bu` BEFORE UPDATE ON `cart` FOR EACH ROW IF (new.insurance = 1)
THEN
	SET new.cartprice = (SELECT (price*1.1) AS price FROM cars WHERE registration = new.registration);
ELSE
	SET new.cartprice = (SELECT price FROM cars WHERE registration = new.registration);
END IF
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favs`
--

CREATE TABLE `favs` (
  `registrationfav` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `userfav` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `favs`
--

INSERT INTO `favs` (`registrationfav`, `userfav`) VALUES
('3649CGE', 'us'),
('1345PDS', 'gineraantoni@gmail.com'),
('3649CGE', 'gineraantoni@gmail.com'),
('4788GGD', 'gineraantoni@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `img`
--

CREATE TABLE `img` (
  `id` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `src` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
  `tipo` varchar(100) COLLATE utf8mb4_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `img`
--

INSERT INTO `img` (`id`, `src`, `tipo`) VALUES
('0000AAA', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('0000AAB', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('0000AAC', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('0000AAF', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('0000ASD', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('0000AXC', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('1345PDS', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('1455LKD', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('1834JAF', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('1836NAO', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('2484HSU', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('2846HDS', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('3456GXW', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('3649CGE', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('4788GGD', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('7993HSF', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('9582JSI', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('9834UZB', 'https://i.pinimg.com/originals/bd/b4/6f/bdb46ffb292c431640cf33a2a64a9c64.jpg', 'car'),
('BMW', 'https://cdn.pixabay.com/photo/2016/03/26/22/34/car-1281640_960_720.jpg', 'cat'),
('KM0', 'https://cdn.pixabay.com/photo/2015/12/08/00/28/car-1081742_960_720.jpg\r\n', 'cat'),
('Luxury', 'https://cdn.pixabay.com/photo/2020/09/06/07/37/car-5548242_960_720.jpg', 'cat'),
('Preowned', 'https://cdn.pixabay.com/photo/2017/08/22/00/27/car-dashboard-2667434_960_720.jpg', 'cat'),
('Seat', 'https://cdn.pixabay.com/photo/2017/08/12/12/00/seat-leon-2634185_960_720.jpg', 'cat');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `fullname` varchar(80) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `username` varchar(50) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `passwd` varchar(100) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `avatar` varchar(70) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `tokenVerify` varchar(50) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `tokenRecover` varchar(50) COLLATE utf8mb4_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`fullname`, `username`, `email`, `passwd`, `avatar`, `tokenVerify`, `tokenRecover`) VALUES
('jaj', '', '', '$2y$10$W1R596wYPwBPqRIf/gbBOOij4oyiHLC3uOHvDojQdVELMv5gWZsi2', 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e', NULL, NULL),
('asd', 'asd', 'antonitormogar@gmail.com', '$2y$10$0fSOWr1sJt03rCLMaVRPAuxiR4R.sqHzFk8a0/y76GX5NU6urJZtq', 'https://www.gravatar.com/avatar/de6a2212f5284fa47dde5660d2ce45d9', NULL, NULL),
('asdasdasdad', 'lksvhbghnsñldkfgnsdfg', 'asdasdasdasdadasd@gmail.com', '$2y$10$yBr7UaZ96M01uAS3Jw.pCeRfgBmFBCJb6cP1DVDaHW2.8H4x4Dp.2', 'https://www.gravatar.com/avatar/7ce6345696f30d7c14bef07d21683b7d', '954f042e638822888962', NULL),
('avatar', 'avatar', 'avatar@gmail.com', '$2y$10$zNdRht5YjtyxAumXGC/XtuEHIsFp8P1YAAT6kOwzywv.HDFnb8SY2', 'https://www.gravatar.com/avatar/07a002296bb5e158727d66cf3699ed34', NULL, NULL),
('avatarr', 'avatarr', 'avatarr@gmail.com', '$2y$10$EGFkrFT1VjY8PcvXz0emsen.o6YKKKGWsuGdpE9AkwY7nsGlsKb5q', 'https://www.gravatar.com/avatar/8811f917041bf23899eadedb29eff383', NULL, NULL),
('asdasdasdad', 'asdasdasfafa', 'dfgdfsghdfghf@gmail.com', '$2y$10$BS.Dp/BgHcEx0Afh3Ud51OJ8v9m7umkC8Foi1IeSaZmoWXfO4153i', 'https://www.gravatar.com/avatar/ae2295e28d4dcda25d9f13614b512f99', '47ab25dacb0f3c4eb051', NULL),
('Antoni Tormo Garcia', 'gineraantoni@gmail.com', 'gineraantoni@gmail.com', '$2y$10$YsNHjV4IbGTsgoMq4l2KW.gYbaWhArqTqEHI0j2rjF39PLuBuaoi2', 'https://avatars.githubusercontent.com/u/45063500?v=4', NULL, NULL),
('pi', 'pi', 'pi@pi.com', '$2y$10$0dpczUhUB8Fjjw4mubPRgOFwaPqejicOvh7RUe89AS5Yp5Dfyq1qe', 'https://www.gravatar.com/avatar/1c72471006d11ad1ffd50906190af702', NULL, NULL),
('us', 'us', 'us@gmail.com', '$2y$10$VNOC5VO40OLprh6hoVmroe19rotAtEDZOXj.2J5oe6itefOPCMGNu', 'https://www.gravatar.com/avatar/cb5cacb0179cf7ea2249626492764b23', NULL, NULL),
('user', 'user', 'user@gmail.com', '$2y$10$Lmf9oO4GHdApxsbrQ9CvUeqbpjp/4/hFlA9r8qNuATwsNJWi.ouRW', 'https://www.gravatar.com/avatar/cba1f2d695a5ca39ee6f343297a761a4', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`registration`);

--
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`registration`);

--
-- Indices de la tabla `img`
--
ALTER TABLE `img`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `username` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
