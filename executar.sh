#!/usr/bin/env bash
# ==============================================================================
# Script de Execução do Projeto Guia Social
# ==============================================================================

cd "$(dirname "$0")"

echo "========================================="
echo "   Iniciando Guia Social..."
echo "========================================="

# 1. Cria ou ativa o ambiente virtual Python
if [ ! -d "venv" ]; then
    echo "[1/3] Criando ambiente virtual Python..."
    python3 -m venv venv || python -m venv venv
    source venv/bin/activate
    echo "[2/3] Instalando dependencias..."
    pip install -r requirements.txt
else
    source venv/bin/activate
fi

# 2. Se a pasta dist do frontend não existir e o npm estiver disponível, compila o front
if [ ! -d "frontend/dist" ] && command -v npm &> /dev/null; then
    echo "[Frontend] Compilando frontend..."
    cd frontend && npm install && npm run build && cd ..
fi

echo "[3/3] Iniciando o servidor em http://127.0.0.1:8000"
echo "Para encerrar, pressione Ctrl + C no terminal."
echo "========================================="

# Abre o navegador automaticamente após 1.5 segundos
if [[ "$OSTYPE" == "darwin"* ]]; then
    (sleep 2 && open "http://127.0.0.1:8000") &
elif [[ "$OSTYPE" == "linux-gnu"* ]] && command -v xdg-open &> /dev/null; then
    (sleep 2 && xdg-open "http://127.0.0.1:8000") &
fi

# Executa o servidor que serve tanto a API quanto a interface web
python3 backend/main.py || python backend/main.py
