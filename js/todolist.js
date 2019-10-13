$(function() {
    load();
    $('#title').on('keydown', function(event) {
        if (event.keycode || event.which === 13) {
            if ($(this).val() === '') {
                alert('请输入内容');
            } else {
                var local = getDate();
                local.push({ title: $(this).val(), done: false });
                saveData(local);
                load();
                $(this).val('');
            }
        }
    });

    // 删除
    $('ul, ol').on('click', 'a', function() {
        var data = getDate();
        var index = $(this).attr('id');
        data.splice(index, 1);
        saveData(data);
        load();
    });

    // 正在进行和已完成
    $('ul, ol').on('click', 'input', function() {
        var data = getDate();
        var index = $(this).siblings('a').attr('id');
        data[index].done = $(this).prop('checked');
        saveData(data);
        load();
    });

    // 读取本地存储的数据
    function getDate() {
        var data = localStorage.getItem('todolist');
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // 保存本地数据
    function saveData(data) {
        localStorage.setItem('todolist', JSON.stringify(data));
    }

    // 渲染加载数据
    function load() {
        var data = getDate();
        $('ol, ul').empty();
        var todoCount = 0;
        var doneCount = 0;
        $.each(data, function(i, n) {
            if (n.done) {
                $('ul').prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                doneCount++;
            } else {
                $('ol').prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                todoCount++;
            }
        });
        $('#todocount').text(todoCount);
        $('#donecount').text(doneCount);
    }

})