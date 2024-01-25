BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [phoneNumber] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    [userName] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Patient] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [phoneNumber] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [userName] NVARCHAR(1000) NOT NULL,
    [dob] DATETIME2,
    [userAddress] NVARCHAR(1000),
    [islock] BIT NOT NULL CONSTRAINT [Patient_islock_df] DEFAULT 0,
    [refreshToken] NVARCHAR(1000),
    CONSTRAINT [Patient_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Patient_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [Patient_phoneNumber_key] UNIQUE NONCLUSTERED ([phoneNumber])
);

-- CreateTable
CREATE TABLE [dbo].[Staff] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [phoneNumber] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [userName] NVARCHAR(1000) NOT NULL,
    [dob] DATETIME2,
    [userAddress] NVARCHAR(1000),
    [islock] BIT NOT NULL CONSTRAINT [Staff_islock_df] DEFAULT 0,
    [refreshToken] NVARCHAR(1000),
    CONSTRAINT [Staff_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Staff_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [Staff_phoneNumber_key] UNIQUE NONCLUSTERED ([phoneNumber])
);

-- CreateTable
CREATE TABLE [dbo].[UserAdmin] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [phoneNumber] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [dob] DATETIME2,
    [userAddress] NVARCHAR(1000),
    [userName] NVARCHAR(1000) NOT NULL,
    [refreshToken] NVARCHAR(1000),
    CONSTRAINT [UserAdmin_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UserAdmin_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [UserAdmin_phoneNumber_key] UNIQUE NONCLUSTERED ([phoneNumber])
);

-- CreateTable
CREATE TABLE [dbo].[Dentist] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [phoneNumber] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [userName] NVARCHAR(1000) NOT NULL,
    [dob] DATETIME2,
    [userAddress] NVARCHAR(1000),
    [islock] BIT NOT NULL CONSTRAINT [Dentist_islock_df] DEFAULT 0,
    [refreshToken] NVARCHAR(1000),
    CONSTRAINT [Dentist_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Dentist_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [Dentist_phoneNumber_key] UNIQUE NONCLUSTERED ([phoneNumber])
);

-- CreateTable
CREATE TABLE [dbo].[Appointment] (
    [idPatient] NVARCHAR(1000) NOT NULL,
    [idDentist] NVARCHAR(1000) NOT NULL,
    [dateOfAppointment] DATETIME2 NOT NULL,
    [timeOfAppointment] DATETIME2 NOT NULL,
    CONSTRAINT [Appointment_pkey] PRIMARY KEY CLUSTERED ([idDentist],[dateOfAppointment],[timeOfAppointment])
);

-- CreateTable
CREATE TABLE [dbo].[Schedule] (
    [idDentist] NVARCHAR(1000) NOT NULL,
    [dateOfAppointment] DATETIME2 NOT NULL,
    [timeOfAppointment] DATETIME2 NOT NULL,
    CONSTRAINT [Schedule_pkey] PRIMARY KEY CLUSTERED ([idDentist],[dateOfAppointment],[timeOfAppointment])
);

-- CreateTable
CREATE TABLE [dbo].[Record] (
    [id] NVARCHAR(1000) NOT NULL,
    [idPatient] NVARCHAR(1000) NOT NULL,
    [idDentist] NVARCHAR(1000) NOT NULL,
    [dateOfAppointment] DATETIME2 NOT NULL,
    [timeOfAppointment] DATETIME2 NOT NULL,
    [total] INT NOT NULL CONSTRAINT [Record_total_df] DEFAULT 0,
    [diagnose] NVARCHAR(1000) NOT NULL,
    [symptom] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Record_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Prescription] (
    [idRecord] NVARCHAR(1000) NOT NULL,
    [idBatch] NVARCHAR(1000) NOT NULL,
    [idDrug] NVARCHAR(1000) NOT NULL,
    [quantity] INT NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [total] INT NOT NULL,
    CONSTRAINT [Prescription_pkey] PRIMARY KEY CLUSTERED ([idRecord],[idBatch],[idDrug]),
    CONSTRAINT [Prescription_idBatch_key] UNIQUE NONCLUSTERED ([idBatch]),
    CONSTRAINT [Prescription_idDrug_key] UNIQUE NONCLUSTERED ([idDrug])
);

-- CreateTable
CREATE TABLE [dbo].[ServiceIndicator] (
    [idRecord] NVARCHAR(1000) NOT NULL,
    [idService] NVARCHAR(1000) NOT NULL,
    [total] INT NOT NULL,
    CONSTRAINT [ServiceIndicator_pkey] PRIMARY KEY CLUSTERED ([idRecord],[idService])
);

-- CreateTable
CREATE TABLE [dbo].[Service] (
    [id] NVARCHAR(1000) NOT NULL,
    [serviceName] NVARCHAR(1000) NOT NULL,
    [price] INT NOT NULL,
    [isDelete] BIT NOT NULL CONSTRAINT [Service_isDelete_df] DEFAULT 0,
    CONSTRAINT [Service_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Drug] (
    [idBatch] NVARCHAR(1000) NOT NULL,
    [idDrug] NVARCHAR(1000) NOT NULL,
    [drugName] NVARCHAR(1000) NOT NULL,
    [unit] NVARCHAR(1000) NOT NULL,
    [indicator] NVARCHAR(1000) NOT NULL,
    [quantity] INT NOT NULL,
    [expireDate] DATETIME2 NOT NULL,
    [price] INT NOT NULL,
    [isDelete] BIT NOT NULL CONSTRAINT [Drug_isDelete_df] DEFAULT 0,
    CONSTRAINT [Drug_pkey] PRIMARY KEY CLUSTERED ([idBatch]),
    CONSTRAINT [Drug_idBatch_idDrug_key] UNIQUE NONCLUSTERED ([idBatch],[idDrug])
);

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_idPatient_fkey] FOREIGN KEY ([idPatient]) REFERENCES [dbo].[Patient]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_idDentist_fkey] FOREIGN KEY ([idDentist]) REFERENCES [dbo].[Dentist]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Schedule] ADD CONSTRAINT [Schedule_idDentist_fkey] FOREIGN KEY ([idDentist]) REFERENCES [dbo].[Dentist]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Record] ADD CONSTRAINT [Record_idPatient_fkey] FOREIGN KEY ([idPatient]) REFERENCES [dbo].[Patient]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Record] ADD CONSTRAINT [Record_idDentist_fkey] FOREIGN KEY ([idDentist]) REFERENCES [dbo].[Dentist]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Prescription] ADD CONSTRAINT [Prescription_idRecord_fkey] FOREIGN KEY ([idRecord]) REFERENCES [dbo].[Record]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Prescription] ADD CONSTRAINT [Prescription_idBatch_idDrug_fkey] FOREIGN KEY ([idBatch], [idDrug]) REFERENCES [dbo].[Drug]([idBatch],[idDrug]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ServiceIndicator] ADD CONSTRAINT [ServiceIndicator_idRecord_fkey] FOREIGN KEY ([idRecord]) REFERENCES [dbo].[Record]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ServiceIndicator] ADD CONSTRAINT [ServiceIndicator_idService_fkey] FOREIGN KEY ([idService]) REFERENCES [dbo].[Service]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
