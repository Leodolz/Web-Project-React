FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY WebExamPlatformBackend/WebExamPlatformBackend.csproj WebExamPlatformBackend/
RUN dotnet restore WebExamPlatformBackend/WebExamPlatformBackend.csproj
COPY . .
WORKDIR /src/WebExamPlatformBackend
RUN dotnet build WebExamPlatformBackend.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish WebExamPlatformBackend.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "WebExamPlatformBackend.dll"]
