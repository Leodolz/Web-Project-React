FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["LoginRegisterBackendNetCore/LoginRegisterBackendNetCore.csproj", "LoginRegisterBackendNetCore/"]
RUN dotnet restore "LoginRegisterBackendNetCore/LoginRegisterBackendNetCore.csproj"
COPY . .
WORKDIR "/src/LoginRegisterBackendNetCore"
RUN dotnet build "LoginRegisterBackendNetCore.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "LoginRegisterBackendNetCore.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "LoginRegisterBackendNetCore.dll"]