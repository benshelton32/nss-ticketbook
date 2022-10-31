USE [master]

IF db_id('TicketBook') IS NULl
BEGIN
    CREATE DATABASE [TicketBook]
END;
GO

USE [TicketBook]
GO


CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirebaseUserId] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Team] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Abbreviation] nvarchar(255) NOT NULL,
  [Location] nvarchar(255) NOT NULL,
  [Logo] nvarchar(255) NOT NULL,
  [LeagueId] int NOT NULL
)
GO

CREATE TABLE [Stadium] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Location] nvarchar(255) NOT NULL,
  [TeamId] int NOT NULL,
  [FirstGameDate] datetime NOT NULL,
  [LastGameDate] datetime
)
GO

CREATE TABLE [AttendedEvent] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [HomeTeamId] int NOT NULL,
  [AwayTeamId] int NOT NULL,
  [HomeTeamScore] int NOT NULL,
  [AwayTeamScore] int NOT NULL,
  [StadiumId] int NOT NULL,
  [Date] datetime NOT NULL,
  [Section] nvarchar(255) NOT NULL,
  [Row] nvarchar(255) NOT NULL,
  [Seat] nvarchar(255) NOT NULL,
  [Overtime] bit,
  [LengthOfOvertime] nvarchar(255),
  [Notes] nvarchar(255)
)
GO

CREATE TABLE [League] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Abbreviation] nvarchar(255) NOT NULL,
  [Logo] nvarchar(255) NOT NULL,
  [SportId] int NOT NULL
)
GO

CREATE TABLE [Sport] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [ImageLocation] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Picture] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [ImageLocation] nvarchar(255) NOT NULL,
  [AttendedEventId] int NOT NULL
)
GO

CREATE TABLE [FavoriteTeams] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [TeamId] int NOT NULL
)
GO

ALTER TABLE [AttendedEvent] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Picture] ADD FOREIGN KEY ([AttendedEventId]) REFERENCES [AttendedEvent] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [AttendedEvent] ADD FOREIGN KEY ([StadiumId]) REFERENCES [Stadium] ([Id])
GO

ALTER TABLE [AttendedEvent] ADD FOREIGN KEY ([HomeTeamId]) REFERENCES [Team] ([Id])
GO

ALTER TABLE [AttendedEvent] ADD FOREIGN KEY ([AwayTeamId]) REFERENCES [Team] ([Id])
GO

ALTER TABLE [Team] ADD FOREIGN KEY ([LeagueId]) REFERENCES [League] ([Id])
GO

ALTER TABLE [League] ADD FOREIGN KEY ([SportId]) REFERENCES [Sport] ([Id])
GO

ALTER TABLE [FavoriteTeams] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [FavoriteTeams] ADD FOREIGN KEY ([TeamId]) REFERENCES [Team] ([Id])
GO

ALTER TABLE [Stadium] ADD FOREIGN KEY ([TeamId]) REFERENCES [Team] ([Id])
GO
